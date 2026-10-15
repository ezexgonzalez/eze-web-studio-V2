import { useEffect, useId } from 'react'
import { ParticlesProvider, useParticlesProvider } from '@tsparticles/react'
import { tsParticles } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'
import { loadParticleContainer } from './loadParticleContainer'

let initialization
let initializationError
const failures = new Set()
function initialize(engine) {
  initialization ??= new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error('Particle engine did not initialize within 8 seconds')), 8000)
    Promise.resolve().then(() => loadSlim(engine)).then(resolve, reject).finally(() => window.clearTimeout(timeout))
  }).catch(error => {
    initializationError = error
    failures.forEach(report => report(error))
    throw error
  })
  return initialization
}

function ParticleCanvas({ options, onLoaded, onFailure }) {
  const id = `hero-particles-${useId().replaceAll(':', '')}`
  const { loaded } = useParticlesProvider()
  useEffect(() => {
    if (!loaded) return
    return loadParticleContainer({ load: () => tsParticles.load({ id, options }), onLoaded, onFailure })
  }, [id, loaded, options, onLoaded, onFailure])
  return <div id={id} className="hero-particles"
    style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
}

// Official provider initializes the same engine once. Replace only its uncaught
// load/destroy lifecycle with a local adapter, not the native particle renderer.
export function ParticleField({ options, onLoaded, onFailure }) {
  useEffect(() => {
    failures.add(onFailure)
    if (initializationError) onFailure(initializationError)
    return () => { failures.delete(onFailure) }
  }, [onFailure])
  return <ParticlesProvider init={initialize}>
    <ParticleCanvas options={options} onLoaded={onLoaded} onFailure={onFailure} />
  </ParticlesProvider>
}
