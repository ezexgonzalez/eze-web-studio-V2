import { animate } from 'motion'
import { arcMotionState } from './arcMotionState'

export function createLivingArcMotion(svg, { background, interactive }, animateClock = animate) {
  const gradient = svg.querySelector('[data-arc-energy]')
  const mist = svg.querySelector('[data-arc-layer="mist"]')
  const halo = svg.querySelector('[data-arc-layer="halo"]')
  const stops = [...gradient.querySelectorAll('stop')].map(node => ({ node, opacity: Number(node.getAttribute('stop-opacity')) }))
  const field = svg.querySelector('[data-arc-field]')
  const response = svg.querySelector('[data-arc-response]')
  const pointerMask = svg.querySelector('[data-arc-pointer]')
  const mobile = svg.dataset.arcVariant === 'mobile'
  const width = svg.viewBox.baseVal.width
  const path = svg.querySelector('[data-arc-layer="core"]')
  const length = path.getTotalLength()
  const samples = Array.from({ length: 96 }, (_, i) => path.getPointAtLength(length * i / 96))
  let pointer = { x: -1000, y: -1000, strength: 0 }
  let current = { ...pointer }
  let previousTime = performance.now()
  let elapsed = 0
  function move(event) {
    if (event.pointerType && event.pointerType !== 'mouse') return
    const matrix = svg.getScreenCTM()
    if (!matrix) return
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
    const bounds = background.getBoundingClientRect()
    const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom
    const distance = Math.min(...samples.map(sample => Math.hypot(sample.x - point.x, sample.y - point.y)))
    pointer = { x: point.x, y: point.y, strength: inside ? Math.max(0, 1 - distance / 180) : 0 }
  }
  function leave() { pointer.strength = 0 }
  // Keep the static look, but tighten live density spacing so drift is readable.
  gradient.setAttribute('x1', -width * .15)
  gradient.setAttribute('x2', width * 1.15)
  // One clock; accumulated time stays continuous across clock repetitions.
  let clock
  function restore() {
    gradient.removeAttribute('gradientTransform'); mist.removeAttribute('transform'); halo.removeAttribute('transform'); field.style.opacity = ''
    gradient.setAttribute('x1', -width * .5); gradient.setAttribute('x2', width * 1.5)
    stops.forEach(({ node, opacity }) => node.setAttribute('stop-opacity', opacity))
    response.setAttribute('opacity', '0'); response.removeAttribute('transform')
  }
  try {
    clock = animateClock(0, 1, { duration: 120, repeat: Infinity, ease: 'linear', onUpdate: () => {
      const now = performance.now()
      const delta = Math.max(0, Math.min(now - previousTime, 50))
      elapsed += delta / 1000
      const state = arcMotionState(elapsed, width, mobile)
      const ease = 1 - Math.exp(-delta / 380)
      previousTime = now
      if (pointer.strength > 0 && current.strength < .001) { current.x = pointer.x; current.y = pointer.y }
      current.x += (pointer.x - current.x) * ease
      current.y += (pointer.y - current.y) * ease
      current.strength += (pointer.strength - current.strength) * ease
      gradient.setAttribute('gradientTransform', `translate(${state.energyX} 0)`)
      stops.forEach(({ node, opacity }, i) => node.setAttribute('stop-opacity', opacity * state.shimmer(i)))
      mist.setAttribute('transform', `translate(${state.mistX} ${state.mistY})`)
      halo.setAttribute('transform', `translate(0 ${state.haloY})`)
      field.style.opacity = String(state.intensity)
      pointerMask.setAttribute('cx', current.x); pointerMask.setAttribute('cy', current.y)
      response.setAttribute('transform', `translate(0 ${-9 * current.strength})`)
      response.setAttribute('opacity', current.strength * .68)
    } })
  } catch (error) { restore(); throw error }
  if (interactive && typeof DOMPoint !== 'undefined') {
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('blur', leave)
    document.addEventListener('pointerleave', leave)
  }
  return () => {
    clock.stop()
    window.removeEventListener('pointermove', move)
    window.removeEventListener('blur', leave)
    document.removeEventListener('pointerleave', leave)
    restore()
  }
}
