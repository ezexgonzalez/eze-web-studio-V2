import { useEffect } from 'react'

// Independent of animation: reduced motion retains the tuned static light stack.
export function LabHaloQuality({ target, variant, settings, onError }) {
  useEffect(() => {
    const svg = target?.querySelector(`[data-arc-variant="${variant}"]`)
    if (!svg) return
    const restore = []
    const set = (node, name, value) => {
      if (!node) throw new Error(`Missing halo quality target: ${name}`)
      const original = node.getAttribute(name)
      restore.push(() => original === null ? node.removeAttribute(name) : node.setAttribute(name, original))
      node.setAttribute(name, value)
    }
    try {
      for (const name of ['core', 'halo', 'mist']) {
        const path = svg.querySelector(`[data-arc-layer="${name}"]`)
        set(path, 'stroke-width', settings[`${name}Width`])
        set(path, 'opacity', settings[`${name}Opacity`])
        // Static and live filters share the same quality, including paused fallback.
        const live = svg.querySelector(`[data-arc-filter="${name}"]`)
        const staticFilter = svg.querySelector(`[id="${live.id.replace(/-live$/, '')}"]`)
        for (const filter of [staticFilter, live]) set(filter?.querySelector('feGaussianBlur'), 'stdDeviation', settings[`${name}Blur`])
      }
    } catch (error) { onError('ARC', error) }
    return () => restore.reverse().forEach(reset => reset())
  }, [target, variant, settings, onError])
  return null
}
