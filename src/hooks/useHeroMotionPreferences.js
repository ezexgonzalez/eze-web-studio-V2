import { useEffect, useState } from 'react'

const initialPreferences = { active: false, desktop: false, tablet: false, wide: false, interactive: false }

// One visibility/preference owner; inactive effects are unmounted and released.
export function useHeroMotionPreferences(backgroundRef) {
  const [preferences, setPreferences] = useState(initialPreferences)
  useEffect(() => {
    const background = backgroundRef.current
    if (!background || typeof IntersectionObserver === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 75rem)')
    const tablet = window.matchMedia('(min-width: 48rem)')
    const wide = window.matchMedia('(min-width: 110rem)')
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const queries = [reduced, desktop, tablet, wide, pointer]
    let visible = false
    function synchronize() {
      const next = {
        active: visible && !document.hidden && !reduced.matches,
        desktop: desktop.matches, tablet: tablet.matches, wide: wide.matches,
        interactive: desktop.matches && pointer.matches,
      }
      setPreferences(current => Object.keys(next).every(key => current[key] === next[key]) ? current : next)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      synchronize()
    }, { threshold: 0 })
    observer.observe(background)
    queries.forEach(query => query.addEventListener('change', synchronize))
    document.addEventListener('visibilitychange', synchronize)
    return () => {
      observer.disconnect()
      queries.forEach(query => query.removeEventListener('change', synchronize))
      document.removeEventListener('visibilitychange', synchronize)
    }
  }, [backgroundRef])
  return preferences
}
