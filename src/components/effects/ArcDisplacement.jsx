import { useEffect } from 'react'
import { createArcDisplacement } from './arcDisplacement'

export function ArcDisplacement({ target, variant, backgroundRef, interactive, onFailure }) {
  useEffect(() => {
    const svg = target?.querySelector(`[data-arc-variant="${variant}"]`)
    if (!svg || typeof SVGFEDisplacementMapElement === 'undefined') return
    try {
      return createArcDisplacement(svg, { background: backgroundRef.current, interactive })
    } catch {
      onFailure()
    }
  }, [target, variant, backgroundRef, interactive, onFailure])
  return null
}
