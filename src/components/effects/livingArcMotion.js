import { animate } from 'motion'

export function createLivingArcMotion(svg, { background, interactive }, animateClock = animate) {
  const gradient = svg.querySelector('[data-arc-energy]')
  const mist = svg.querySelector('[data-arc-layer="mist"]')
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
  function move(event) {
    if (event.pointerType && event.pointerType !== 'mouse') return
    const matrix = svg.getScreenCTM()
    if (!matrix) return
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
    const bounds = background.getBoundingClientRect()
    const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom
    const distance = Math.min(...samples.map(sample => Math.hypot(sample.x - point.x, sample.y - point.y)))
    pointer = { x: point.x, y: point.y, strength: inside ? Math.max(0, 1 - distance / 140) : 0 }
  }
  function leave() { pointer.strength = 0 }
  // One Motion clock: broad energy density travels back/forth without a dash seam.
  const clock = animateClock(0, 1, { duration: mobile ? 22 : 18, repeat: Infinity, ease: 'linear', onUpdate: phase => {
    const angle = phase * Math.PI * 2
    const now = performance.now()
    const ease = 1 - Math.exp(-Math.min(now - previousTime, 50) / 450)
    previousTime = now
    if (pointer.strength > 0 && current.strength < .001) { current.x = pointer.x; current.y = pointer.y }
    current.x += (pointer.x - current.x) * ease
    current.y += (pointer.y - current.y) * ease
    current.strength += (pointer.strength - current.strength) * ease
    gradient.setAttribute('gradientTransform', `translate(${Math.sin(angle) * width * .22} 0)`)
    mist.setAttribute('transform', `translate(${Math.sin(angle * 2) * (mobile ? 2 : 5)} ${Math.cos(angle) * (mobile ? 2 : 4)})`)
    field.style.opacity = String(.86 + .14 * Math.sin(angle * 2))
    pointerMask.setAttribute('cx', current.x); pointerMask.setAttribute('cy', current.y)
    response.setAttribute('transform', `translate(0 ${-5 * current.strength})`)
    response.setAttribute('opacity', current.strength * .5)
  } })
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
    gradient.removeAttribute('gradientTransform'); mist.removeAttribute('transform'); field.style.opacity = ''
    response.setAttribute('opacity', '0'); response.removeAttribute('transform')
  }
}
