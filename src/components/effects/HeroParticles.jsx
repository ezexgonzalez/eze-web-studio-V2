import { useEffect, useRef } from 'react'
import { createParticleField } from '../../vendor/react-bits/particles'

const colors = ['#59E3FF', '#75F6FF', '#F5F7F7']

export function HeroParticles({ backgroundRef, desktop, interactive, onFailure }) {
  const containerRef = useRef(null)
  useEffect(() => createParticleField(containerRef.current, {
    particleCount: desktop ? 70 : 28,
    speed: desktop ? 0.65 : 0.45,
    particleColors: colors,
    particleBaseSize: desktop ? 54 : 40,
    pixelRatio: Math.min(window.devicePixelRatio || 1, desktop ? 1.5 : 1),
    interactive,
    pointerTarget: backgroundRef.current.closest('.hero'),
    onFailure,
  }), [backgroundRef, desktop, interactive, onFailure])
  return <div className={`hero-particles${desktop ? '' : ' hero-particles-mobile'}`} ref={containerRef} />
}
