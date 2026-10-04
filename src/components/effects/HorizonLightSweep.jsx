import { useEffect, useRef } from 'react'
import { animate, motionValue, svgEffect } from 'motion'
import { horizonPaths } from './horizonPaths'

// Nested short highlights form a soft shoulder and brighter centre, not a loader.
const segments = [
  { length: 0.14, inset: 0, width: 10, color: '#59E3FF', opacity: 0.26, glow: true },
  { length: 0.14, inset: 0, width: 2, color: '#59E3FF', opacity: 0.16 },
  { length: 0.10, inset: 0.02, width: 2, color: '#75F6FF', opacity: 0.38 },
  { length: 0.05, inset: 0.045, width: 1.5, color: '#F5F7F7', opacity: 0.72 },
]

export function HorizonLightSweep({ variant }) {
  const svgRef = useRef(null)
  const { path, viewBox } = horizonPaths[variant]
  useEffect(() => {
    const svg = svgRef.current
    const progress = motionValue(0.85)
    const offsets = segments.map(segment => motionValue(0.85 + segment.inset))
    const lengths = segments.map(segment => motionValue(segment.length))
    const cancelEffects = [...svg.querySelectorAll('path')].map((node, i) => svgEffect(node, {
      pathLength: lengths[i], pathOffset: offsets[i],
    }))
    const unsubscribe = progress.on('change', value => offsets.forEach((offset, i) => offset.set(value + segments[i].inset)))
    const sweep = animate(progress, [0.85, 1.85], {
      duration: variant === 'mobile' ? 14 : 12, repeat: Infinity, ease: 'linear',
    })
    const breathing = animate(svg.querySelector('g'), { opacity: [0.65, 0.9, 0.65] }, {
      duration: 9, repeat: Infinity, ease: 'easeInOut',
    })
    return () => {
      sweep.stop(); breathing.stop(); unsubscribe()
      cancelEffects.forEach(cancel => cancel())
      progress.destroy(); [...offsets, ...lengths].forEach(value => value.destroy())
    }
  }, [variant])
  return (
    <svg ref={svgRef} className="horizon-light-sweep" viewBox={viewBox} fill="none" aria-hidden="true">
      <g>{segments.map((segment, i) => <path key={i} d={path} stroke={segment.color}
        strokeWidth={segment.width} strokeLinecap="round" opacity={segment.opacity}
        pathLength="1" strokeDasharray={`${segment.length} ${1 - segment.length}`} strokeDashoffset={-(0.85 + segment.inset)}
        className={segment.glow ? 'horizon-light-soft' : undefined} />)}</g>
    </svg>
  )
}
