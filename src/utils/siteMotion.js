// Solution-only reading emphasis. No hidden content or entrance animations.
export function createSolutionHighlight(section) {
  if (!section || !window.IntersectionObserver || !window.requestAnimationFrame) return () => {}
  const features = [...section.querySelectorAll('.solution-feature')]
  const headings = features.map(feature => feature.querySelector('h3'))
  let visible = false
  let disposed = false
  let frame = null
  let active = null

  function select(next) {
    if (active === next) return
    active = next
    features.forEach(feature => {
      if (feature === next) feature.dataset.readingActive = 'true'
      else feature.removeAttribute('data-reading-active')
    })
  }

  function update() {
    frame = null
    if (disposed || !visible || document.hidden) return
    const height = window.innerHeight
    const readingCenter = height * .45
    let nearest = null
    let distance = Infinity
    headings.forEach((heading, index) => {
      if (!heading) return
      const rect = heading.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      // Only emphasize a word currently in the main reading band.
      if (center < height * .2 || center > height * .7) return
      const delta = Math.abs(center - readingCenter)
      if (delta < distance) { nearest = features[index]; distance = delta }
    })
    select(nearest)
  }

  function schedule() {
    if (!disposed && visible && !document.hidden && frame === null) frame = window.requestAnimationFrame(update)
  }

  const observer = new window.IntersectionObserver(entries => {
    if (disposed) return
    visible = entries[0].isIntersecting
    if (visible) schedule()
    else {
      if (frame !== null) window.cancelAnimationFrame(frame)
      frame = null
      select(null)
    }
  })
  observer.observe(section)
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  document.addEventListener('visibilitychange', schedule)
  return () => {
    disposed = true
    observer.disconnect()
    if (frame !== null) window.cancelAnimationFrame(frame)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    document.removeEventListener('visibilitychange', schedule)
    select(null)
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
