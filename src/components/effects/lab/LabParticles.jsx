import { useCallback, useEffect, useMemo, useRef } from 'react'
import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { labParticleOptions } from './labSettings'

let initialization
let initializationError
const errors = new EventTarget()
function initialize(engine) {
  initialization ??= loadSlim(engine).catch(error => {
    initializationError = error
    errors.dispatchEvent(new CustomEvent('failed', { detail: error }))
    throw error
  })
  return initialization
}

export function LabParticles({ settings, interactive, onStatus, onError, onTelemetry, onReady }) {
  const containerRef = useRef(null)
  const options = useMemo(() => labParticleOptions(settings, interactive), [settings, interactive])
  const loaded = useCallback(async container => {
    if (!container || container.destroyed) { onError('PARTICLES', new Error('particlesLoaded received no live container')); return }
    const canvas = container.canvas.domElement
    if (!canvas || !canvas.width || !canvas.height || !container.particles.count) {
      onError('PARTICLES', new Error(`Empty particle canvas/count: ${canvas?.width}×${canvas?.height}; count ${container.particles.count}`)); return
    }
    containerRef.current = container
    onStatus('RUNNING')
    onReady(true)
  }, [onStatus, onError, onReady])
  useEffect(() => {
    onStatus('LOADING')
    const fail = event => onError('PARTICLES', event.detail)
    errors.addEventListener('failed', fail)
    if (initializationError) fail({ detail: initializationError })
    let previous = new Map()
    let lastMovement = performance.now()
    const timeout = window.setTimeout(() => {
      if (!containerRef.current) onError('PARTICLES', new Error('No particlesLoaded callback after 8s. Check console/network/engine initialization.'))
    }, 8000)
    const poll = window.setInterval(() => {
      const container = containerRef.current
      if (!container || container.destroyed) return
      try {
      const particles = container.particles.filter(() => true)
      let travel = 0
      for (const particle of particles) {
        const old = previous.get(particle.id)
        if (old) travel = Math.max(travel, Math.hypot(particle.position.x - old.x, particle.position.y - old.y))
      }
      previous = new Map(particles.map(particle => [particle.id, { x: particle.position.x, y: particle.position.y }]))
      if (travel > .1) lastMovement = performance.now()
      const canvas = container.canvas.domElement
      onTelemetry({ count: container.particles.count, canvas: `${canvas?.width || 0} × ${canvas?.height || 0}`, dpr: container.retina.pixelRatio, travel: travel.toFixed(1) })
      if (!document.hidden && performance.now() - lastMovement > 3000) {
        onError('PARTICLES', new Error('Live container but particle positions unchanged for 3s. This is a runtime failure, not visual success.'))
      }
      } catch (error) { onError('PARTICLES', error) }
    }, 500)
    return () => {
      errors.removeEventListener('failed', fail)
      window.clearTimeout(timeout); window.clearInterval(poll)
      containerRef.current = null
      onReady(false)
    }
  }, [onError, onTelemetry, onReady, onStatus])
  return <ParticlesProvider init={initialize}>
    <Particles id="hero-lab-particles" options={options} particlesLoaded={loaded}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 1 }} />
  </ParticlesProvider>
}
