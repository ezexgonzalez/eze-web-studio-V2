import { useEffect } from 'react'
import { createArcDisplacement } from './arcDisplacement'
import { arcSettings, haloQuality, plumeSettings } from './heroMotionSettings'

export function ArcDisplacement({ target, variant, backgroundRef, interactive, onFailure }) {
  useEffect(() => {
    const blocked = reason => {
      if (import.meta.env.DEV) console.warn(`[HeroMotion] arc blocked — ${reason}`, { variant })
    }
    if (!interactive) { blocked('pointer eligibility'); return }
    // Ref delivery can precede the eligible scene; wait for target without latching failure.
    if (!target) { blocked('SVG target not ready'); return }
    let stop
    const failed = (system, error) => {
      if (import.meta.env.DEV) console.warn(`[HeroMotion] ${system} initialization/runtime failed`, error)
      onFailure()
    }
    try {
      const svg = target.querySelector(`[data-arc-variant="${variant}"]`)
      if (!svg) { blocked('SVG not found'); return }
      if (!('scale' in document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap'))) {
        blocked('feDisplacementMap unsupported'); return
      }
      if (!svg.getScreenCTM()) { blocked('getScreenCTM unavailable'); return }
      if (!svg.getBoundingClientRect().width) { blocked('SVG bounding rect width is zero'); return }
      if (typeof DOMPoint === 'undefined') { blocked('DOMPoint unavailable'); return }
      if (!backgroundRef.current) { blocked('Hero background not ready'); return }
      stop = createArcDisplacement(svg, { background: backgroundRef.current, interactive,
        settings: arcSettings, quality: haloQuality, plumeSettings, onError: failed })
      if (import.meta.env.DEV) {
        console.info('[HeroMotion] arc mounted', { variant })
        if (plumeSettings.enabled) console.info('[HeroMotion] plume ready')
      }
    } catch (error) { failed('arc', error) }
    return () => stop?.()
  }, [target, variant, backgroundRef, interactive, onFailure])
  return null
}
