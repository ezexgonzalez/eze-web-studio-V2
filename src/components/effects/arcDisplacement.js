import { animate, attrEffect, mapValue, motionValue, springValue } from 'motion'

// Motion owns all animated attributes. No custom clock or requestAnimationFrame.
export function createArcDisplacement(svg, { background, interactive }) {
  const mobile = svg.dataset.arcVariant === 'mobile'
  const filters = [...svg.querySelectorAll('[data-arc-filter]')]
  const restorations = []
  const effects = []
  const animations = []
  const values = []
  let observer
  const remember = value => { values.push(value); return value }
  const loop = (value, keyframes, duration) => {
    animations.push(animate(value, keyframes, { duration, repeat: Infinity, ease: 'easeInOut' }))
  }
  const restore = () => {
    observer?.disconnect()
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
  const strength = remember(springValue(0, { stiffness: 75, damping: 20, mass: 1 }))
  let samples = []
  function leave() { strength.set(0) }
  function move(event) {
    if (event.pointerType && event.pointerType !== 'mouse') return
    const matrix = svg.getScreenCTM()
    if (!matrix) return
    const bounds = background.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) { leave(); return }
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
    const distance = Math.min(...samples.map(sample => Math.hypot(sample.x - point.x, sample.y - point.y)))
    const proximity = Math.max(0, 1 - distance / 220)
    if (!proximity) { leave(); return }
    if (strength.get() < .01) { x.jump(point.x - 220); y.jump(point.y - 220) }
    x.set(point.x - 220); y.set(point.y - 220)
    strength.set(proximity)
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
      filter.setAttribute('x', Math.min(first.x, last.x) - 256)
      filter.setAttribute('y', Math.min(first.y, last.y) - 256)
      filter.setAttribute('width', Math.abs(last.x - first.x) + 512)
      filter.setAttribute('height', Math.abs(last.y - first.y) + 512)
    })
  }
  try {
    const frequency = remember(motionValue('.009 .014'))
    const dx = remember(motionValue(-40))
    const dy = remember(motionValue(-24))
    const ranges = mobile ? [[34, 58], [18, 32], [6, 12]] : [[80, 132], [38, 68], [12, 24]]
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
      loop(scale, [minimum, maximum, minimum], 9 + index * 3)
      if (!mobile) {
        const image = filter.querySelector('[data-arc-pointer]')
        const local = filter.querySelector('[data-arc-local]')
        preserve(image, ['x', 'y']); preserve(local, ['scale'])
        bind(image, { x, y })
        bind(local, { scale: remember(mapValue(strength, [0, 1], [0, [160, 100, 32][index]])) })
      }
      layer.setAttribute('filter', `url(#${filter.id})`)
    })
    loop(frequency, ['.009 .014', '.015 .009', '.009 .014'], mobile ? 18 : 14)
    loop(dx, [-40, 64, -40], mobile ? 19 : 13)
    loop(dy, [-24, 44, -24], mobile ? 23 : 17)
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
      samples = Array.from({ length: 128 }, (_, index) => path.getPointAtLength(length * index / 128))
      window.addEventListener('pointermove', move, { passive: true })
      window.addEventListener('blur', leave)
      document.addEventListener('pointerleave', leave)
    }
  } catch (error) { restore(); throw error }
  return restore
}
