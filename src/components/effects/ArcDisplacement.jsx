import { useEffect } from 'react'
import { createArcDisplacement } from './arcDisplacement'
import { arcSettings, haloQuality, plumeSettings } from './heroMotionSettings'

export function ArcDisplacement({ target, variant, backgroundRef, interactive, onFailure }) {
  useEffect(() => {
    const svg = target?.querySelector(`[data-arc-variant="${variant}"]`)
    if (!svg || !interactive) return
    let stop
    try {
      // Real DOM capability, as proven in Eze's Lab; constructor availability is unreliable.
      if (!('scale' in document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap'))) return
      if (!svg.getScreenCTM() || !svg.getBoundingClientRect().width || typeof DOMPoint === 'undefined') return
      stop = createArcDisplacement(svg, { background: backgroundRef.current, interactive,
        settings: arcSettings, quality: haloQuality, plumeSettings, onError: onFailure })
    } catch { onFailure() }
    return () => stop?.()
  }, [target, variant, backgroundRef, interactive, onFailure])
  return null
}
