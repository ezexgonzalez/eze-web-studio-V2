const easing = 'cubic-bezier(.22, 1, .36, 1)'

// Finite progressive enhancement: no styles hide content before JS/observation.
export function createEditorialMotion(root) {
  if (!root || !window.IntersectionObserver) return () => {}
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  const targets = [...root.querySelectorAll('[data-reveal]')]
  const seen = new Set()
  const animations = new Map()
  let observer
  let disposed = false

  function cancelAnimations() {
    for (const animation of animations.keys()) animation.cancel()
    animations.clear()
  }

  function play(element, frames, delay) {
    if (!element.animate) return
    try {
      const animation = element.animate(frames, { duration: 550, delay, easing, fill: 'none' })
      animations.set(animation, element)
      animation.onfinish = () => animations.delete(animation)
      animation.oncancel = () => animations.delete(animation)
    } catch {
      // Enhancement failure leaves the original, fully visible layout intact.
    }
  }

  function observe() {
    observer?.disconnect()
    cancelAnimations()
    if (disposed || preference.matches || document.hidden) return
    observer = new window.IntersectionObserver(entries => {
      if (disposed) return
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target)) continue
        const element = entry.target
        seen.add(element)
        observer.unobserve(element)
        if (preference.matches || document.hidden || element.contains(document.activeElement)) continue
        const delay = Math.min(210, Math.max(0, Number(element.dataset.revealDelay) || 0))
        play(element, [{ opacity: .4, translate: '0 16px' }, { opacity: 1, translate: '0 0' }], delay)
        const accent = element.querySelector('[data-reveal-accent]')
        if (accent) play(accent, [{ opacity: .3, transform: 'scaleX(.65)' }, { opacity: 1, transform: 'scaleX(1)' }], delay + 80)
      }
    }, { threshold: .12, rootMargin: '0px 0px -32px 0px' })
    for (const target of targets) if (!seen.has(target)) observer.observe(target)
  }

  function settleFocused(event) {
    for (const [animation, element] of animations) {
      if (element.contains(event.target)) {
        animation.cancel()
        animations.delete(animation)
      }
    }
  }

  observe()
  preference.addEventListener('change', observe)
  document.addEventListener('visibilitychange', observe)
  root.addEventListener('focusin', settleFocused)
  return () => {
    disposed = true
    observer?.disconnect()
    cancelAnimations()
    preference.removeEventListener('change', observe)
    document.removeEventListener('visibilitychange', observe)
    root.removeEventListener('focusin', settleFocused)
  }
}

// No React scroll state: a single attribute changes only across the threshold.
export function createFixedHeader(header, sentinel) {
  if (!header || !sentinel) return () => {}
  const style = document.documentElement.style
  const previousOffset = style.getPropertyValue('--header-offset')
  let lastHeight
  let disposed = false
  let lastScrolled
  function measure() {
    const height = Math.ceil(header.getBoundingClientRect().height)
    if (!disposed && height > 0 && height !== lastHeight) {
      style.setProperty('--header-offset', `${height}px`)
      lastHeight = height
    }
  }
  function setScrolled(value) {
    if (disposed || lastScrolled === value) return
    lastScrolled = value
    header.dataset.scrolled = String(value)
  }
  function scrollFallback() { setScrolled(window.scrollY > 8) }
  measure()
  scrollFallback()
  const resize = window.ResizeObserver ? new window.ResizeObserver(measure) : null
  resize?.observe(header)
  if (!resize) window.addEventListener('resize', measure)
  const intersection = window.IntersectionObserver ? new window.IntersectionObserver(entries => {
    setScrolled(!entries[0].isIntersecting)
  }) : null
  if (intersection) intersection.observe(sentinel)
  else window.addEventListener('scroll', scrollFallback, { passive: true })
  return () => {
    disposed = true
    resize?.disconnect()
    intersection?.disconnect()
    window.removeEventListener('resize', measure)
    window.removeEventListener('scroll', scrollFallback)
    header.removeAttribute('data-scrolled')
    if (previousOffset) style.setProperty('--header-offset', previousOffset)
    else style.removeProperty('--header-offset')
  }
}
