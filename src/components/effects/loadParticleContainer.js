// React adapter 4.4.0 has no load-error callback. Own the supported engine.load
// lifecycle locally, with the same provider/renderer and no engine monkeypatch.
export function loadParticleContainer({ load, onLoaded, onFailure, timeout = 8000 }) {
  let stopped = false
  let container
  const destroy = () => { container?.destroy(); container = undefined }
  const fail = error => {
    if (stopped) return
    stopped = true
    clearTimeout(timer)
    destroy()
    onFailure(error)
  }
  const timer = setTimeout(() => fail(new Error('Particle container did not load within 8 seconds')), timeout)
  Promise.resolve().then(() => stopped ? undefined : load()).then(async result => {
    if (stopped) { result?.destroy(); return }
    container = result
    if (!container || container.destroyed || !container.canvas.domElement?.width ||
        !container.canvas.domElement?.height || !container.particles.count) {
      throw new Error('Particle component received no live canvas/count')
    }
    await onLoaded(container)
    clearTimeout(timer)
  }).catch(fail)
  return () => { stopped = true; clearTimeout(timer); destroy() }
}
