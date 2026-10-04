import { useEffect } from 'react'
import { createLivingArcMotion } from './livingArcMotion'

export function LivingArcMotion({ target, variant, backgroundRef, interactive, onFailure }) {
  useEffect(() => {
    const svg = target?.querySelector(`[data-arc-variant="${variant}"]`)
    if (!svg) return
    try {
      return createLivingArcMotion(svg, { background: backgroundRef.current, interactive })
    } catch {
      onFailure()
    }
  }, [target, variant, backgroundRef, interactive, onFailure])
  return null
}
