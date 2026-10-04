import { useId } from 'react'
import { horizonPaths } from './horizonPaths'

// Static and live use the same diffuse light. The approved curve is a guide only.
export function HeroLightArc({ variant }) {
  const id = useId().replaceAll(':', '')
  const { path, viewBox } = horizonPaths[variant]
  const width = Number(viewBox.split(' ')[2])
  const height = Number(viewBox.split(' ')[3])
  const mobile = variant === 'mobile'
  const layers = [
    { name: 'mist', width: mobile ? 34 : 64, blur: mobile ? 16 : 28, opacity: .28 },
    { name: 'halo', width: mobile ? 16 : 30, blur: mobile ? 8 : 14, opacity: .58 },
    { name: 'core', width: mobile ? 5 : 9, blur: mobile ? 2.5 : 4, opacity: .62 },
  ]
  return <svg className="hero-light-arc" data-arc-variant={variant} viewBox={viewBox} fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-energy`} data-arc-energy gradientUnits="userSpaceOnUse" x1={-width * .5} x2={width * 1.5} y1="0" y2="0">
        {[.12, .7, .24, 1, .3, .78, .12].map((opacity, i) => <stop key={i} offset={i / 6} stopColor={i === 3 ? '#A0F8FF' : '#26DDF4'} stopOpacity={opacity} />)}
      </linearGradient>
      {layers.map(layer => <filter key={layer.name} id={`${id}-${layer.name}`} filterUnits="userSpaceOnUse" x="-160" y="-160" width={width + 320} height={height + 320} colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation={layer.blur} />
      </filter>)}
      <radialGradient id={`${id}-pointer`}><stop stopColor="white" /><stop offset="1" stopColor="black" /></radialGradient>
      <mask id={`${id}-local`} maskUnits="userSpaceOnUse" x="-160" y="-160" width={width + 320} height={height + 320}>
        <circle data-arc-pointer cx="-1000" cy="-1000" r="150" fill={`url(#${id}-pointer)`} />
      </mask>
    </defs>
    <g data-arc-field>
      {layers.map(layer => <path key={layer.name} data-arc-layer={layer.name} d={path} stroke={`url(#${id}-energy)`}
        strokeWidth={layer.width} opacity={layer.opacity} filter={`url(#${id}-${layer.name})`} />)}
    </g>
    <g mask={`url(#${id}-local)`}>
      <path data-arc-response d={path} stroke="#75F6FF" strokeWidth="24" opacity="0" filter={`url(#${id}-halo)`} />
    </g>
  </svg>
}
