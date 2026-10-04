import { useEffect, useRef } from 'react'
import { createParticleField } from '../../vendor/react-bits/particles'

const colors = ['#59E3FF', '#75F6FF', '#A0F8FF', '#D6FAFF']

export function HeroParticles({ backgroundRef, desktop, interactive, onFailure }) {
  const containerRef = useRef(null)
  useEffect(() => createParticleField(containerRef.current, {
    particleCount: desktop ? 70 : 28,
    speed: desktop ? 1.05 : 0.72,
    particleColors: colors,
    particleBaseSize: desktop ? 160 : 120,
    pixelRatio: Math.min(window.devicePixelRatio || 1, desktop ? 1.5 : 1),
    interactive,
    pointerTarget: backgroundRef.current.closest('.hero'),
    onFailure,
  }), [backgroundRef, desktop, interactive, onFailure])
  return <div className={`hero-particles${desktop ? '' : ' hero-particles-mobile'}`} ref={containerRef} />
}
