import { HeroParticles } from './HeroParticles'
import { LivingArcMotion } from './LivingArcMotion'

export default function HeroAtmosphere({ backgroundRef, desktop, tablet, wide, interactive, onFailure, arcTarget }) {
  const variant = tablet ? (desktop ? (wide ? 'wide' : 'production') : 'tablet') : 'mobile'
  return <>
    <HeroParticles backgroundRef={backgroundRef} desktop={desktop} interactive={interactive} onFailure={onFailure} />
    <LivingArcMotion target={arcTarget} variant={variant} backgroundRef={backgroundRef} interactive={interactive} onFailure={onFailure} />
  </>
}
