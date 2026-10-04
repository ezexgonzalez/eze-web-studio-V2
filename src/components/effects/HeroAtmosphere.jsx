import { useCallback, useState } from 'react'
import { HeroParticles } from './HeroParticles'
import { ArcDisplacement } from './ArcDisplacement'

export default function HeroAtmosphere({ backgroundRef, desktop, tablet, wide, interactive, arcTarget, onParticleStatus }) {
  const [particleFailed, setParticleFailed] = useState(false)
  const [arcFailed, setArcFailed] = useState(false)
  const failParticles = useCallback(() => { setParticleFailed(true); onParticleStatus(false) }, [onParticleStatus])
  const failArc = useCallback(() => setArcFailed(true), [])
  const variant = tablet ? (desktop ? (wide ? 'wide' : 'production') : 'tablet') : 'mobile'
  return <>
    {!particleFailed && <HeroParticles desktop={desktop} interactive={interactive} onFailure={failParticles} onStatus={onParticleStatus} />}
    {!arcFailed && <ArcDisplacement target={arcTarget} variant={variant} backgroundRef={backgroundRef} interactive={interactive} onFailure={failArc} />}
  </>
}
