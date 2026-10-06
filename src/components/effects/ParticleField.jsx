import { useCallback, useEffect, useId, useRef } from 'react'
import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

let initialization
let initializationError
const failures = new Set()
function initialize(engine) {
  initialization ??= loadSlim(engine).catch(error => {
    initializationError = error
    failures.forEach(report => report(error))
    throw error
  })
  return initialization
}

// Official component owns loading/destroy/StrictMode. No manual engine.load or custom hosts.
export function ParticleField({ options, onLoaded, onFailure }) {
  const id = useId().replaceAll(':', '')
  const ready = useRef(false)
  const loaded = useCallback(async container => {
    if (!container || container.destroyed || !container.canvas.domElement?.width || !container.canvas.domElement?.height || !container.particles.count) {
      onFailure(new Error('Particle component received no live canvas/count'))
      return
    }
    ready.current = true
    await onLoaded(container)
  }, [onLoaded, onFailure])
  useEffect(() => {
    ready.current = false
    failures.add(onFailure)
    if (initializationError) onFailure(initializationError)
    const timeout = window.setTimeout(() => {
      if (!ready.current) onFailure(new Error('Particle component did not load within 8 seconds'))
    }, 8000)
    return () => { failures.delete(onFailure); window.clearTimeout(timeout) }
  }, [onFailure])
  return <ParticlesProvider init={initialize}>
    <Particles id={`hero-particles-${id}`} className="hero-particles" options={options} particlesLoaded={loaded}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
  </ParticlesProvider>
}
