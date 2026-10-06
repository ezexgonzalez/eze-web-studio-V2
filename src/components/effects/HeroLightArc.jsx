import { useId } from 'react'
import { horizonPaths } from './horizonPaths'
import { haloQuality } from './heroMotionSettings'

const pointerMask = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="440" height="440"><defs><radialGradient id="m"><stop stop-color="white"/><stop offset=".35" stop-color="white" stop-opacity=".8"/><stop offset="1" stop-color="white" stop-opacity="0"/></radialGradient></defs><circle cx="220" cy="220" r="220" fill="url(#m)"/></svg>')}`

// React owns path filter selection; Motion only changes values inside the live graph.
export function HeroLightArc({ variant, live = false }) {
  const id = useId().replaceAll(':', '')
  const { path, viewBox } = horizonPaths[variant]
  const width = Number(viewBox.split(' ')[2])
  const height = Number(viewBox.split(' ')[3])
  const mobile = variant === 'mobile'
  const layers = ['mist', 'halo', 'core'].map(name => ({ name,
    width: haloQuality[`${name}Width`], blur: haloQuality[`${name}Blur`], opacity: haloQuality[`${name}Opacity`],
  }))
  const bounds = { filterUnits: 'userSpaceOnUse', x: -256, y: -256, width: width + 512, height: height + 512, colorInterpolationFilters: 'sRGB' }
  return <svg className="hero-light-arc" data-arc-variant={variant} data-arc-mode={live ? 'live' : 'static'} viewBox={viewBox} fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-energy`} gradientUnits="userSpaceOnUse" x1={-width * .5} x2={width * 1.5} y1="0" y2="0">
        {[.12, .7, .24, 1, .3, .78, .12].map((opacity, i) => <stop key={i} offset={i / 6} stopColor={i === 3 ? '#A0F8FF' : '#26DDF4'} stopOpacity={opacity} />)}
      </linearGradient>
      {layers.map(layer => <filter key={layer.name} id={`${id}-${layer.name}`} {...bounds}><feGaussianBlur stdDeviation={layer.blur} /></filter>)}
      {layers.map(layer => <filter key={layer.name} id={`${id}-${layer.name}-live`} data-arc-filter={layer.name} {...bounds}>
        <feTurbulence type="fractalNoise" baseFrequency=".009 .014" numOctaves="1" seed="8" result="noise" data-arc-noise />
        <feOffset in="noise" dx="0" dy="0" result="flow" data-arc-flow />
        <feDisplacementMap in="SourceGraphic" in2="flow" scale="0" xChannelSelector="R" yChannelSelector="G" result="idle" data-arc-idle />
        {!mobile && <>
          <feImage href={pointerMask} x="-1000" y="-1000" width="440" height="440" result="pointer" data-arc-pointer />
          <feComposite in="flow" in2="pointer" operator="in" result="localNoise" />
          <feFlood floodColor="rgb(50%, 50%, 50%)" result="neutral" />
          <feComposite in="localNoise" in2="neutral" operator="over" result="localMap" />
          <feDisplacementMap in="idle" in2="localMap" scale="0" xChannelSelector="R" yChannelSelector="G" result="disturbed" data-arc-local />
        </>}
        <feGaussianBlur in={mobile ? 'idle' : 'disturbed'} stdDeviation={layer.blur} />
      </filter>)}
    </defs>
    {layers.map(layer => <path key={layer.name} data-arc-layer={layer.name} d={path} stroke={`url(#${id}-energy)`}
      strokeWidth={layer.width} opacity={layer.opacity} filter={`url(#${id}-${layer.name}${live ? '-live' : ''})`} />)}
  </svg>
}
