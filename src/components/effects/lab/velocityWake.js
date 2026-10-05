import { animate, motionValue } from 'motion'

// Speed is measured in CSS px/ms; direction is separately mapped into SVG space.
export function createVelocityTracker() {
  let previous
  return {
    reset() { previous = undefined },
    sample(event, point) {
      const current = { x: event.clientX, y: event.clientY, time: event.timeStamp, point }
      const last = previous
      previous = current
      const dt = last ? current.time - last.time : 0
      if (dt <= 0 || dt > 150) return null
      const vx = (current.x - last.x) / dt
      const vy = (current.y - last.y) / dt
      const dx = point.x - last.point.x
      const dy = point.y - last.point.y
      const length = Math.hypot(dx, dy)
      return length ? { speed: Math.hypot(vx, vy), x: dx / length, y: dy / length } : null
    },
  }
}

const ns = 'http://www.w3.org/2000/svg'
let sequence = 0
export function createVelocityWake(svg, settings, quality, onTelemetry, onError) {
  const id = `lab-wake-${++sequence}`
  const defs = document.createElementNS(ns, 'defs')
  const group = document.createElementNS(ns, 'g')
  group.setAttribute('data-lab-wakes', '')
  const make = (tag, attrs, parent) => {
    const node = document.createElementNS(ns, tag)
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value)
    parent.appendChild(node)
    return node
  }
  const [, , width, height] = svg.getAttribute('viewBox').split(/\s+/).map(Number)
  const bounds = { x: -512, y: -512, width: width + 1024, height: height + 1024 }
  const tracker = createVelocityTracker()
  let lastSpawn = -Infinity
  const originals = []
  const sources = ['mist', 'halo'].map(name => svg.querySelector(`[data-arc-layer="${name}"]`))
  const holes = sources.map((source, index) => {
    const mask = make('mask', { id: `${id}-gap-${index}`, maskUnits: 'userSpaceOnUse', 'mask-type': 'luminance', ...bounds }, defs)
    make('rect', { ...bounds, fill: 'white' }, mask)
    const gradient = make('radialGradient', { id: `${id}-dark-${index}` }, defs)
    make('stop', { offset: 0, 'stop-color': 'black', 'stop-opacity': 1 }, gradient)
    make('stop', { offset: 1, 'stop-color': 'black', 'stop-opacity': 0 }, gradient)
    originals.push([source, source.getAttribute('mask')])
    source.setAttribute('mask', `url(#${id}-gap-${index})`)
    return Array.from({ length: 3 }, () => make('circle', { cx: 0, cy: 0, r: settings.radius, opacity: 0, fill: `url(#${id}-dark-${index})` }, mask))
  })
  const slots = Array.from({ length: 3 }, (_, index) => {
    const slot = { busy: false, animation: null, progress: motionValue(0) }
    const layer = make('g', { opacity: 0 }, group)
    const mask = make('mask', { id: `${id}-copy-${index}`, maskUnits: 'userSpaceOnUse', 'mask-type': 'luminance', ...bounds }, defs)
    const gradient = make('radialGradient', { id: `${id}-soft-${index}` }, defs)
    make('stop', { offset: 0, 'stop-color': 'white' }, gradient)
    make('stop', { offset: 1, 'stop-color': 'white', 'stop-opacity': 0 }, gradient)
    const circle = make('circle', { cx: 0, cy: 0, r: settings.radius, fill: `url(#${id}-soft-${index})` }, mask)
    const blurs = sources.map((source, sourceIndex) => {
      const name = ['mist', 'halo'][sourceIndex]
      const filter = make('filter', { id: `${id}-blur-${index}-${name}`, filterUnits: 'userSpaceOnUse', ...bounds }, defs)
      const blur = make('feGaussianBlur', { stdDeviation: quality[`${name}Blur`] }, filter)
      const clipped = make('g', { mask: `url(#${id}-copy-${index})` }, layer)
      // Guide geometry and original color gradient; no core duplicate.
      make('path', { d: source.getAttribute('d'), fill: 'none', stroke: source.getAttribute('stroke'), 'stroke-width': quality[`${name}Width`], opacity: quality[`${name}Opacity`] * settings[`${name}Influence`], filter: `url(#${filter.id})` }, clipped)
      return blur
    })
    slot.stopChange = slot.progress.on('change', progress => {
      try {
        if (!slot.busy) return
        const fade = (1 - progress) ** 1.4
        layer.setAttribute('transform', `translate(${slot.dx * progress} ${slot.dy * progress})`)
        layer.setAttribute('opacity', settings.opacity * fade)
        circle.setAttribute('r', settings.radius + settings.expansion * progress)
        holes.forEach((band, i) => band[index].setAttribute('opacity', settings[['mistInfluence', 'haloInfluence'][i]] * fade))
        blurs.forEach((blur, i) => blur.setAttribute('stdDeviation', quality[`${['mist', 'halo'][i]}Blur`] * (1 + progress * .35)))
      } catch (error) { onError('ARC', error) }
    })
    slot.start = (point, velocity) => {
      slot.busy = true
      const distance = settings.distance * Math.min(1.5, Math.max(.5, velocity.speed / settings.speedThreshold))
      slot.dx = velocity.x * distance; slot.dy = velocity.y * distance
      circle.setAttribute('cx', point.x); circle.setAttribute('cy', point.y)
      holes.forEach(band => { band[index].setAttribute('cx', point.x); band[index].setAttribute('cy', point.y) })
      slot.progress.jump(0)
      layer.setAttribute('transform', 'translate(0 0)')
      layer.setAttribute('opacity', settings.opacity)
      circle.setAttribute('r', settings.radius)
      holes.forEach((band, i) => band[index].setAttribute('opacity', settings[['mistInfluence', 'haloInfluence'][i]]))
      slot.animation = animate(slot.progress, 1, { duration: settings.lifetime / 1000, ease: 'easeOut', onComplete: () => {
        slot.busy = false; layer.setAttribute('opacity', 0)
        holes.forEach(band => band[index].setAttribute('opacity', 0))
        onTelemetry(`active ${slots.filter(item => item.busy).length}/3`)
      } })
    }
    return slot
  })
  svg.appendChild(defs); svg.appendChild(group)
  return {
    reset: () => tracker.reset(),
    move(event, point, nearest, near) {
      const velocity = tracker.sample(event, point)
      if (!settings.enabled || !near || !velocity || velocity.speed < settings.speedThreshold || event.timeStamp - lastSpawn < settings.cooldown) return
      const slot = slots.find(item => !item.busy)
      if (!slot) return
      lastSpawn = event.timeStamp
      slot.start(nearest, velocity)
      onTelemetry(`${velocity.speed.toFixed(2)} px/ms; direction ${velocity.x.toFixed(2)}, ${velocity.y.toFixed(2)}; active ${slots.filter(item => item.busy).length}/3`)
    },
    stop() {
      tracker.reset()
      slots.forEach(slot => { slot.animation?.stop(); slot.stopChange(); slot.progress.destroy() })
      originals.forEach(([node, mask]) => mask === null ? node.removeAttribute('mask') : node.setAttribute('mask', mask))
      defs.remove(); group.remove()
    },
  }
}
