import { useEffect, useRef } from 'react'
import { ParticlesProvider, useParticlesProvider } from '@tsparticles/react'
import { tsParticles } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'
import { heroParticleOptions } from './heroParticleOptions'

let initialization
let mountId = 0
let loadQueue = Promise.resolve()
// Stable provider callback: register the slim plugins once, including in StrictMode.
function initializeParticles(engine) {
  initialization ??= loadSlim(engine)
  return initialization
}

function ParticleField({ desktop, interactive, onFailure, onStatus }) {
  const target = useRef(null)
  const { loaded } = useParticlesProvider()
  useEffect(() => {
    if (!loaded) return
    // Each effect owns a distinct host/id. A late load cannot destroy its successor.
    const host = document.createElement('div')
    host.style.cssText = 'position:absolute;inset:0;pointer-events:none'
    target.current.append(host)
    const id = `hero-light-dust-${++mountId}`
    let cancelled = false
    let container
    // Serialize engine starts: a cancelled async mount is disposed before the next starts.
    loadQueue = loadQueue.then(async () => {
      if (cancelled) return
      try {
        container = await tsParticles.load({ id, element: host, options: heroParticleOptions(desktop, interactive, window.devicePixelRatio || 1) })
        if (cancelled) { container?.destroy(); return }
        if (!container || container.destroyed || tsParticles.getImages?.(container)?.some(image => image.error)) {
          container?.destroy(); onFailure(); return
        }
        onStatus(true)
      } catch {
        // Engine loading may fail after inserting a container/canvas.
        tsParticles.items.find(item => item.id.description === id)?.destroy()
        if (!cancelled) onFailure()
      }
    })
    return () => {
      cancelled = true
      container?.destroy()
      host.remove()
      onStatus(false)
    }
  }, [loaded, desktop, interactive, onFailure, onStatus])
  return <div className={`hero-particles${desktop ? '' : ' hero-particles-mobile'}`} ref={target} />
}

export function HeroParticles(props) {
  const { onFailure } = props
  useEffect(() => {
    let cancelled = false
    initializeParticles(tsParticles).catch(() => { if (!cancelled) onFailure() })
    return () => { cancelled = true }
  }, [onFailure])
  return <ParticlesProvider init={initializeParticles}><ParticleField {...props} /></ParticlesProvider>
}
