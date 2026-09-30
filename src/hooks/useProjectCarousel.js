import { useEffect, useRef, useState } from 'react'

export function useProjectCarousel(count) {
  const [activeIndex, setActiveIndex] = useState(0)
  const viewportRef = useRef(null)

  function selectProject(index) {
    setActiveIndex(Math.max(0, Math.min(index, count - 1)))
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || count < 2) return
    const mobileLayout = window.matchMedia('(max-width: 1199px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let scrollTimer

    function align(behavior = 'auto') {
      if (!mobileLayout.matches) return
      const slide = viewport.querySelectorAll('[data-project-slide]')[activeIndex]
      if (slide) viewport.scrollTo({ left: slide.offsetLeft, behavior })
    }

    function settle() {
      if (!mobileLayout.matches) return
      const slides = [...viewport.querySelectorAll('[data-project-slide]')]
      let closest = 0
      slides.forEach((slide, index) => {
        if (Math.abs(slide.offsetLeft - viewport.scrollLeft) < Math.abs(slides[closest].offsetLeft - viewport.scrollLeft)) closest = index
      })
      setActiveIndex(closest)
    }

    function onScroll() {
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(settle, 150)
    }

    function onLayoutChange() { align() }
    const scrollEvent = 'onscrollend' in viewport ? 'scrollend' : 'scroll'
    const onScrollEvent = scrollEvent === 'scrollend' ? settle : onScroll
    viewport.addEventListener(scrollEvent, onScrollEvent, { passive: true })
    mobileLayout.addEventListener('change', onLayoutChange)
    reducedMotion.addEventListener('change', onLayoutChange)
    const resizeObserver = new ResizeObserver(onLayoutChange)
    resizeObserver.observe(viewport)
    align(reducedMotion.matches ? 'auto' : 'smooth')

    return () => {
      clearTimeout(scrollTimer)
      resizeObserver.disconnect()
      viewport.removeEventListener(scrollEvent, onScrollEvent)
      mobileLayout.removeEventListener('change', onLayoutChange)
      reducedMotion.removeEventListener('change', onLayoutChange)
    }
  }, [activeIndex, count])

  function onKeyDown(event) {
    const destinations = { ArrowLeft: activeIndex - 1, ArrowRight: activeIndex + 1, Home: 0, End: count - 1 }
    if (Object.hasOwn(destinations, event.key)) {
      event.preventDefault()
      selectProject(destinations[event.key])
    }
  }

  return { activeIndex, viewportRef, selectProject, onKeyDown }
}
