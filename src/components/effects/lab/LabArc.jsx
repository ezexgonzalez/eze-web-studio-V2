import { useEffect } from 'react'
import { createArcDisplacement } from '../arcDisplacement'

export function LabArc({ target, variant, backgroundRef, interactive, settings, quality, plumeSettings, onPlumeTelemetry, onStatus, onError, onPointer, onTelemetry }) {
  useEffect(() => {
    if (!target) return
    let stop
    let poll
    try {
      if (!('scale' in document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap'))) throw new Error('SVG displacement is unsupported in this browser.')
      const svg = target.querySelector(`[data-arc-variant="${variant}"]`)
      if (!svg) throw new Error(`Arc SVG not found: ${variant}`)
      if (svg.getBoundingClientRect().width === 0) throw new Error(`Arc variant ${variant} has zero rendered width.`)
      if (!svg.getScreenCTM()) throw new Error('Arc has no screen transform matrix.')
      if (interactive && typeof DOMPoint === 'undefined') throw new Error('DOMPoint unavailable: cannot map the mouse to the arc.')
      stop = createArcDisplacement(svg, { background: backgroundRef.current, interactive, settings, quality, plumeSettings, onPlumeActivity: activity => onPlumeTelemetry(activity.speed === undefined ? `active ${activity.active}/3` : `${activity.speed.toFixed(2)} px/ms; direction ${activity.x.toFixed(2)}, ${activity.y.toFixed(2)}; active ${activity.active}/3`), onError, onPointer })
      onStatus('RUNNING')
      let previous = ''
      let lastChange = performance.now()
      poll = window.setInterval(() => {
        try {
          const scales = [...svg.querySelectorAll('[data-arc-idle]')].map(node => node.getAttribute('scale'))
          const frequency = svg.querySelector('[data-arc-noise]').getAttribute('baseFrequency')
          const signature = `${scales.join(',')} / ${frequency}`
          if (signature !== previous) lastChange = performance.now()
          previous = signature
          onTelemetry(signature)
          if (!document.hidden && performance.now() - lastChange > 3000) onError('ARC', new Error('Filter attributes unchanged for 3s: Motion is stalled.'))
        } catch (error) { onError('ARC', error) }
      }, 500)
    } catch (error) { onError('ARC', error) }
    return () => { window.clearInterval(poll); stop?.(); onPointer(false) }
  }, [target, variant, backgroundRef, interactive, settings, quality, plumeSettings, onPlumeTelemetry, onStatus, onError, onPointer, onTelemetry])
  return null
}
