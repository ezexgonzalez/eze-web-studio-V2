import { animate, attrEffect, mapValue, motionValue, springValue } from 'motion'
import { createVolumetricWake } from './volumetricWake.js'

// Motion owns all animated attributes. No custom clock or requestAnimationFrame.
export function createArcDisplacement(svg, { background, interactive, settings, quality, plumeSettings, onPlumeActivity, onError, onPointer = () => {} }) {
  const mobile = svg.dataset.arcVariant === 'mobile'
  const filters = [...svg.querySelectorAll('[data-arc-filter]')]
  if (filters.length !== 3) throw new Error(`Expected 3 live arc filters; found ${filters.length}`)
  const restorations = []
  const effects = []
  const animations = []
  const values = []
  let observer
  let plume
  const remember = value => { values.push(value); return value }
  const loop = (value, keyframes, duration) => {
    animations.push(animate(value, keyframes, { duration, repeat: Infinity, ease: 'easeInOut' }))
  }
  const restore = () => {
    observer?.disconnect()
    plume?.stop()
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', move)
    window.removeEventListener('blur', leave)
    document.removeEventListener('pointerleave', leave)
    animations.forEach(animation => animation.stop())
    effects.forEach(stop => stop())
    values.forEach(value => value.destroy())
    restorations.forEach(restoreAttribute => restoreAttribute())
  }
  function bind(node, attributes) { effects.push(attrEffect(node, attributes)) }
  function preserve(node, attributes) {
    attributes.forEach(name => {
      const value = node.getAttribute(name)
      restorations.push(() => value === null ? node.removeAttribute(name) : node.setAttribute(name, value))
    })
  }
  const x = remember(springValue(-1000, { stiffness: 110, damping: 27, mass: 1 }))
  const y = remember(springValue(-1000, { stiffness: 110, damping: 27, mass: 1 }))
  const stiffness = (7 / settings.recovery) ** 2
  const strength = remember(springValue(0, { stiffness, damping: 2 * Math.sqrt(stiffness), mass: 1 }))
  let pointerActive = false
  function pointerStatus(active) { if (active !== pointerActive) { pointerActive = active; onPointer(active) } }
  let samples = []
  function leave() { strength.set(0); pointerStatus(false); plume?.reset() }
  function move(event) {
    if (event.pointerType && event.pointerType !== 'mouse') return
    const matrix = svg.getScreenCTM()
    if (!matrix) return
    const bounds = background.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) { leave(); return }
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
    const nearest = samples.reduce((best, sample) => Math.hypot(sample.x - point.x, sample.y - point.y) < Math.hypot(best.x - point.x, best.y - point.y) ? sample : best, samples[0])
    const distance = Math.hypot(nearest.x - point.x, nearest.y - point.y)
    const index = samples.indexOf(nearest)
    const previous = samples[(index + samples.length - 1) % samples.length]
    const next = samples[(index + 1) % samples.length]
    const tangentLength = Math.hypot(next.x - previous.x, next.y - previous.y) || 1
    const normal = { x: -(next.y - previous.y) / tangentLength, y: (next.x - previous.x) / tangentLength }
    plume?.move(event, point, nearest, distance < settings.radius, normal)
    const proximity = Math.max(0, 1 - distance / settings.radius)
    if (!proximity) { strength.set(0); pointerStatus(false); return }
    if (strength.get() < .01) { x.jump(point.x - settings.radius); y.jump(point.y - settings.radius) }
    x.set(point.x - settings.radius); y.set(point.y - settings.radius)
    strength.set(proximity); pointerStatus(true)
  }
  // Filter only the visible part of the large ellipse, padded for blur/deformation.
  function resize() {
    const matrix = svg.getScreenCTM()
    if (!matrix) return
    const bounds = background.getBoundingClientRect()
    const inverse = matrix.inverse()
    const first = new DOMPoint(bounds.left, bounds.top).matrixTransform(inverse)
    const last = new DOMPoint(bounds.right, bounds.bottom).matrixTransform(inverse)
    filters.forEach(filter => {
      filter.setAttribute('x', Math.min(first.x, last.x) - 512)
      filter.setAttribute('y', Math.min(first.y, last.y) - 512)
      filter.setAttribute('width', Math.abs(last.x - first.x) + 1024)
      filter.setAttribute('height', Math.abs(last.y - first.y) + 1024)
    })
  }
  try {
    const frequency = remember(motionValue('.009 .014'))
    const dx = remember(motionValue(-100))
    const dy = remember(motionValue(-60))
    const ranges = [settings.mist, settings.halo, settings.core].map((value, index) => [value * [200 / 260, 100 / 160, 40 / 70][index], value])
    filters.forEach((filter, index) => {
      const layer = svg.querySelector(`[data-arc-layer="${filter.dataset.arcFilter}"]`)
      preserve(layer, ['filter'])
      preserve(filter, ['x', 'y', 'width', 'height'])
      const noise = filter.querySelector('[data-arc-noise]')
      const flow = filter.querySelector('[data-arc-flow]')
      const idle = filter.querySelector('[data-arc-idle]')
      preserve(noise, ['baseFrequency']); preserve(flow, ['dx', 'dy']); preserve(idle, ['scale'])
      bind(noise, { baseFrequency: frequency }); bind(flow, { dx, dy })
      const [minimum, maximum] = ranges[index]
      const scale = remember(motionValue(minimum))
      bind(idle, { scale })
      if (maximum > 0) loop(scale, [minimum, maximum, minimum], (9 + index * 3) / settings.noiseSpeed)
      if (!mobile) {
        const image = filter.querySelector('[data-arc-pointer]')
        const local = filter.querySelector('[data-arc-local]')
        preserve(image, ['x', 'y', 'width', 'height']); preserve(local, ['scale'])
        image.setAttribute('width', settings.radius * 2); image.setAttribute('height', settings.radius * 2)
        bind(image, { x, y })
        bind(local, { scale: remember(mapValue(strength, [0, 1], [0, [settings.pointerStrength, settings.pointerStrength * .65, settings.pointerStrength * .3][index]])) })
      }
      layer.setAttribute('filter', `url(#${filter.id})`)
    })
    loop(frequency, ['.009 .014', '.015 .009', '.009 .014'], (mobile ? 18 : 14) / settings.noiseSpeed)
    loop(dx, [-100, 160, -100], (mobile ? 19 : 13) / settings.noiseSpeed)
    loop(dy, [-60, 100, -60], (mobile ? 23 : 17) / settings.noiseSpeed)
    resize()
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(resize)
      observer.observe(background)
      observer.observe(svg)
    }
    window.addEventListener('resize', resize, { passive: true })
    if (interactive && !mobile && typeof DOMPoint !== 'undefined') {
      const path = svg.querySelector('[data-arc-layer="core"]')
      const length = path.getTotalLength()
      samples = Array.from({ length: 512 }, (_, index) => path.getPointAtLength(length * index / 512))
      if (plumeSettings.enabled) plume = createVolumetricWake(svg, plumeSettings, quality, onPlumeActivity, onError)
      window.addEventListener('pointermove', move, { passive: true })
      window.addEventListener('blur', leave)
      document.addEventListener('pointerleave', leave)
    }
  } catch (error) { restore(); throw error }
  return restore
}
