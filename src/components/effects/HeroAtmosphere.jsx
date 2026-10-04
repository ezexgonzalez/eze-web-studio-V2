import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { animate } from 'motion'
import { HeroParticles } from './HeroParticles'
import { HorizonLightSweep } from './HorizonLightSweep'

export default function HeroAtmosphere({ backgroundRef, desktop, tablet, wide, interactive, onFailure, sweepTarget }) {
  const variant = tablet ? (desktop ? (wide ? 'wide' : 'production') : 'tablet') : 'mobile'
  useEffect(() => {
    const glow = backgroundRef.current.querySelector(tablet ? '.horizon-desktop-glow' : '.horizon-mobile-glow')
    if (!glow) return
    const breathing = animate(glow, { opacity: tablet ? [1, 0.84, 0.96, 1] : [1, 0.92, 0.98, 1] }, {
      duration: 18, repeat: Infinity, ease: 'easeInOut',
    })
    return () => { breathing.stop(); glow.style.opacity = '' }
  }, [backgroundRef, tablet])
  return <>
    <HeroParticles backgroundRef={backgroundRef} desktop={desktop} interactive={interactive} onFailure={onFailure} />
    {sweepTarget && createPortal(<HorizonLightSweep variant={variant} />, sweepTarget)}
  </>
}
