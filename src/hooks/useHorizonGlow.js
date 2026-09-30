import { useEffect } from 'react'

// Animate only the exported glow's opacity. Geometry and the luminous rim
// remain static; no canvas, renderer, polling or requestAnimationFrame loop.
export function useHorizonGlow(backgroundRef) {
  useEffect(() => {
    const background = backgroundRef.current
    if (!background || !background.animate || !window.IntersectionObserver) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktopScene = window.matchMedia('(min-width: 48rem)')
    let visible = false
    let animation

    function synchronize() {
      animation?.cancel()
      animation = undefined
      if (!visible || document.hidden || reducedMotion.matches) return

      const glow = background.querySelector(desktopScene.matches ? '.horizon-desktop-glow' : '.horizon-mobile-glow')
      animation = glow.animate(
        [{ opacity: 1 }, { opacity: desktopScene.matches ? 0.88 : 0.94 }, { opacity: 1 }],
        { duration: 16000, iterations: Infinity, easing: 'ease-in-out' },
      )
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      synchronize()
    })
    observer.observe(background)
    reducedMotion.addEventListener('change', synchronize)
    desktopScene.addEventListener('change', synchronize)
    document.addEventListener('visibilitychange', synchronize)

    return () => {
      animation?.cancel()
      observer.disconnect()
      reducedMotion.removeEventListener('change', synchronize)
      desktopScene.removeEventListener('change', synchronize)
      document.removeEventListener('visibilitychange', synchronize)
    }
  }, [backgroundRef])
}
