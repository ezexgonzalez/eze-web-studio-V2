import { animate, motionValue } from 'motion'
import { createVelocityTracker } from './pointerVelocity.js'

const ns = 'http://www.w3.org/2000/svg'
const colors = ['#26DDF4', '#59E3FF', '#26DDF4', '#75F6FF', '#26DDF4', '#59E3FF', '#26DDF4', '#A0F8FF']
let sequence = 0
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

// One progress animation per occupied slot. No clock, path clone, or node allocation on pointermove.
export function createVolumetricWake(svg, settings, quality, onActivity, onError) {
  const id = `hero-plume-${++sequence}`
  const defs = document.createElementNS(ns, 'defs')
  const root = document.createElementNS(ns, 'g')
  root.setAttribute('data-hero-plumes', '')
  const make = (tag, attributes, parent) => {
    const node = document.createElementNS(ns, tag)
    for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value)
    parent.appendChild(node)
    return node
  }
  const [, , width, height] = svg.getAttribute('viewBox').split(/\s+/).map(Number)
  const bounds = { x: -512, y: -512, width: width + 1024, height: height + 1024 }
  const tracker = createVelocityTracker()
  const originals = []
  const slots = []
  let lastSpawn = -Infinity
  let stopped = false
  const stop = () => {
    stopped = true
    tracker.reset()
    slots.forEach(slot => { slot.animation?.stop(); slot.stopChange?.(); slot.progress.destroy() })
    originals.forEach(([node, mask]) => mask === null ? node.removeAttribute('mask') : node.setAttribute('mask', mask))
    defs.remove(); root.remove()
  }
  try {
    const sources = ['mist', 'halo'].map(name => svg.querySelector(`[data-arc-layer="${name}"]`))
    const cuts = sources.map((source, index) => {
      if (!source) throw new Error('Missing original mist/halo for plume attenuation')
      const mask = make('mask', { id: `${id}-cut-${index}`, maskUnits: 'userSpaceOnUse', 'mask-type': 'luminance', ...bounds }, defs)
      make('rect', { ...bounds, fill: 'white' }, mask)
      const gradient = make('radialGradient', { id: `${id}-cut-gradient-${index}` }, defs)
      make('stop', { offset: 0, 'stop-color': 'black' }, gradient)
      make('stop', { offset: .35, 'stop-color': 'black', 'stop-opacity': .8 }, gradient)
      make('stop', { offset: 1, 'stop-color': 'black', 'stop-opacity': 0 }, gradient)
      originals.push([source, source.getAttribute('mask')])
      source.setAttribute('mask', `url(#${mask.id})`)
      // Fixed-size, directionally elongated soft cut. Never a growing circular hole.
      return Array.from({ length: 3 }, () => make('ellipse', { cx: 0, cy: 0, rx: settings.baseRadius * 1.9, ry: settings.baseRadius * .65, opacity: 0, fill: `url(#${gradient.id})` }, mask))
    })
    for (let index = 0; index < 3; index++) {
      const slot = { busy: false, progress: motionValue(0) }
      slots.push(slot) // Cleanup also owns partially initialized slots.
      const anchor = make('g', { 'data-plume-slot': index, visibility: 'hidden' }, root)
      const cloud = make('g', { opacity: 0 }, anchor)
      // Local filter coordinates move with the cloud anchor, rather than allocating a scene-sized surface.
      const extent = Math.max(256, settings.travel * 1.5 * 1.1 + (settings.baseRadius + 12) * 1.45 * 1.7 + 80)
      const filter = make('filter', { id: `${id}-fog-${index}`, filterUnits: 'userSpaceOnUse', x: -extent, y: -extent, width: extent * 2, height: extent * 2, 'color-interpolation-filters': 'sRGB' }, defs)
      make('feTurbulence', { type: 'fractalNoise', baseFrequency: '.025 .035', numOctaves: 1, seed: 13 + index * 7, result: 'noise' }, filter)
      const flow = make('feOffset', { in: 'noise', dx: 0, dy: 0, result: 'flow' }, filter)
      const displacement = make('feDisplacementMap', { in: 'SourceGraphic', in2: 'flow', scale: settings.turbulence, xChannelSelector: 'R', yChannelSelector: 'G', result: 'fog' }, filter)
      const blur = make('feGaussianBlur', { in: 'fog', stdDeviation: 5.5 }, filter)
      cloud.setAttribute('filter', `url(#${filter.id})`)
      const wisps = Array.from({ length: settings.blobCount }, (_, i) => {
        const unit = i / Math.max(1, settings.blobCount - 1)
        const signed = i === 0 ? 0 : ((i % 2 ? -1 : 1) * (.25 + unit * .75))
        const radius = Math.max(5, settings.baseRadius + (((i * 7 + index * 3) % 25) - 12))
        const gradient = make('radialGradient', { id: `${id}-wisp-${index}-${i}` }, defs)
        const color = colors[i % colors.length]
        make('stop', { offset: 0, 'stop-color': color, 'stop-opacity': i === 7 ? .32 : .8 }, gradient)
        make('stop', { offset: .28, 'stop-color': color, 'stop-opacity': .45 }, gradient)
        make('stop', { offset: .65, 'stop-color': '#26DDF4', 'stop-opacity': .12 }, gradient)
        make('stop', { offset: 1, 'stop-color': '#26DDF4', 'stop-opacity': 0 }, gradient)
        const node = make('ellipse', { cx: 0, cy: 0, rx: radius * 1.3, ry: radius * .85, fill: `url(#${gradient.id})` }, cloud)
        return { node, radius, signed, initialX: (unit - .5) * settings.baseRadius * .8, initialY: signed * settings.baseRadius * .65, travelFactor: i % 3 === 0 ? .9 + unit * .2 : .55 + unit * .3 }
      })
      const paint = progress => {
        const impactFraction = Math.min(.5, 150 / settings.lifetime)
        const dissipating = clamp((progress - impactFraction) / (1 - impactFraction), 0, 1)
        const drag = 1 + settings.drag * 3.2
        const travel = (1 - Math.exp(-drag * progress)) / (1 - Math.exp(-drag))
        // Coherent initial push, followed by divergence, expansion and fading energy.
        cloud.setAttribute('opacity', settings.opacity * (1 - dissipating) ** 1.6)
        blur.setAttribute('stdDeviation', 5.5 + 4 * dissipating)
        displacement.setAttribute('scale', settings.turbulence * (1 + .35 * dissipating))
        flow.setAttribute('dx', progress * 18); flow.setAttribute('dy', progress * -12)
        const cutRecovery = clamp(1 - progress * settings.lifetime / 350, 0, 1) ** 2
        cuts.forEach((band, i) => band[index].setAttribute('opacity', settings[['mistCut', 'haloCut'][i]] * cutRecovery))
        wisps.forEach(wisp => {
          const angle = slot.angle + wisp.signed * settings.spread * Math.PI / 180 * dissipating
          const distance = slot.impulse * wisp.travelFactor * travel
          const expansion = slot.size * (1 + .7 * dissipating)
          wisp.node.setAttribute('cx', wisp.initialX + Math.cos(angle) * distance)
          wisp.node.setAttribute('cy', wisp.initialY + Math.sin(angle) * distance)
          wisp.node.setAttribute('rx', wisp.radius * 1.3 * expansion)
          wisp.node.setAttribute('ry', wisp.radius * .85 * expansion)
          wisp.node.setAttribute('transform', `rotate(${angle * 180 / Math.PI} ${wisp.initialX + Math.cos(angle) * distance} ${wisp.initialY + Math.sin(angle) * distance})`)
        })
      }
      slot.stopChange = slot.progress.on('change', progress => {
        if (!slot.busy || stopped) return
        try { paint(progress) } catch (error) { onError('ARC', error) }
      })
      slot.start = (point, velocity, normal, pointer) => {
        slot.busy = true
        slot.angle = Math.atan2(velocity.y, velocity.x)
        const response = clamp(velocity.speed / settings.speedThreshold, 1, 1.5)
        slot.impulse = settings.travel * response
        slot.size = 1 + (response - 1) * .35
        // Start around the mist envelope on the impact side, not from a cloned core segment.
        const side = (pointer.x - point.x) * normal.x + (pointer.y - point.y) * normal.y >= 0 ? 1 : -1
        anchor.setAttribute('transform', `translate(${point.x + normal.x * side * quality.mistWidth * .45} ${point.y + normal.y * side * quality.mistWidth * .45})`)
        anchor.setAttribute('visibility', 'visible')
        cuts.forEach(band => band[index].setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${slot.angle * 180 / Math.PI})`))
        slot.progress.jump(0); paint(0)
        slot.animation = animate(slot.progress, 1, { duration: settings.lifetime / 1000, ease: 'linear', onComplete: () => {
          slot.busy = false; cloud.setAttribute('opacity', 0); anchor.setAttribute('visibility', 'hidden')
          cuts.forEach(band => band[index].setAttribute('opacity', 0))
          onActivity?.({ active: slots.filter(item => item.busy).length })
        } })
      }
    }
    svg.appendChild(defs); svg.appendChild(root)
  } catch (error) { stop(); throw error }
  return {
    reset: () => tracker.reset(),
    move(event, point, nearest, near, normal) {
      if (stopped) return
      const velocity = tracker.sample(event, point)
      if (!settings.enabled || !near || !velocity || velocity.speed < settings.speedThreshold || event.timeStamp - lastSpawn < settings.cooldown) return
      const slot = slots.find(item => !item.busy)
      if (!slot) return
      lastSpawn = event.timeStamp
      slot.start(nearest, velocity, normal, point)
      onActivity?.({ speed: velocity.speed, x: velocity.x, y: velocity.y, active: slots.filter(item => item.busy).length })
    },
    stop,
  }
}
