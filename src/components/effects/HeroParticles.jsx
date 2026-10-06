import { useCallback, useEffect, useMemo } from 'react'
import { ParticleField } from './ParticleField'
import { heroParticleOptions } from './heroParticleOptions'

export function HeroParticles({ interactive, onFailure, onStatus }) {
  const options = useMemo(() => heroParticleOptions(interactive), [interactive])
  const loaded = useCallback(async () => onStatus(true), [onStatus])
  useEffect(() => () => onStatus(false), [onStatus])
  return <ParticleField options={options} onLoaded={loaded} onFailure={onFailure} />
}
