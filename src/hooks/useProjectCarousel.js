import { useCallback, useEffect, useSyncExternalStore } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

const reducedQuery = '(prefers-reduced-motion: reduce)'
function subscribeReducedMotion(listener) {
  const query = window.matchMedia(reducedQuery)
  query.addEventListener('change', listener)
  return () => query.removeEventListener('change', listener)
}
function getReducedMotion() { return window.matchMedia(reducedQuery).matches }
function getServerMotion() { return false }
function getServerIndex() { return 0 }

export function useProjectCarousel(count) {
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerMotion)
  const [viewportRef, api] = useEmblaCarousel({
    align: 'center', containScroll: false, loop: false, skipSnaps: false,
    duration: reducedMotion ? 0 : 25, watchDrag: count > 1,
  })
  const subscribe = useCallback(listener => {
    if (!api) return () => {}
    api.on('select', listener).on('reInit', listener)
    return () => { api.off('select', listener).off('reInit', listener) }
  }, [api])
  const getIndex = useCallback(() => api?.selectedScrollSnap() ?? 0, [api])
  // React only projects Embla's selection; it never chooses a second index.
  const activeIndex = useSyncExternalStore(subscribe, getIndex, getServerIndex)

  useEffect(() => {
    if (!api) return
    // Finger/mouse tracking is essential; reduce only the release/snap animation.
    const settleReduced = () => {
      if (getReducedMotion()) api.scrollTo(api.selectedScrollSnap(), true)
    }
    api.on('pointerUp', settleReduced)
    return () => { api.off('pointerUp', settleReduced) }
  }, [api])

  function selectProject(index) { api?.scrollTo(index, reducedMotion) }
  function onKeyDown(event) {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return
    const destinations = { ArrowLeft: activeIndex - 1, ArrowRight: activeIndex + 1, Home: 0, End: count - 1 }
    if (Object.hasOwn(destinations, event.key)) {
      event.preventDefault()
      selectProject(destinations[event.key])
    }
  }

  return {
    activeIndex, viewportRef, selectProject, onKeyDown,
    canPrevious: Boolean(api?.canScrollPrev()), canNext: Boolean(api?.canScrollNext()),
  }
}
