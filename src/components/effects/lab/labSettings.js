import { particleSettings, arcSettings, haloQuality, plumeSettings } from '../heroMotionSettings.js'
export { createParticleOptions as labParticleOptions } from '../particleOptions.js'
export const particleProof = particleSettings
export const arcProof = arcSettings
export const haloQualityProof = haloQuality
export const plumeProof = plumeSettings
export const particleControls = [
  ['count', 'Count', 1, 200, 1], ['speed', 'Speed (range center)', .1, 10, .05],
  ['opacity', 'Opacity (range center)', .05, 1, .025], ['size', 'Size (range center)', 1, 16, .5],
  ['distance', 'Repulse distance', 20, 500, 5], ['strength', 'Repulse strength', .1, 20, .1],
]
export const arcControls = [
  ['mist', 'Idle mist displacement (max)', 0, 600, 5], ['halo', 'Halo displacement (max)', 0, 400, 5],
  ['core', 'Core displacement (max)', 0, 200, 2], ['noiseSpeed', 'Noise speed multiplier', .25, 12, .25],
  ['radius', 'Pointer radius (SVG units)', 50, 600, 10], ['pointerStrength', 'Pointer displacement', 0, 1000, 10],
  ['recovery', 'Spring recovery (seconds)', .3, 2, .1],
]

export const haloQualityControls = ['core', 'halo', 'mist'].flatMap(name => [
  [`${name}Width`, `${name.toUpperCase()} WIDTH`, 1, 100, .5],
  [`${name}Blur`, `${name.toUpperCase()} BLUR`, 0, 40, .5],
  [`${name}Opacity`, `${name.toUpperCase()} OPACITY`, 0, 1, .025],
])
export const plumeControls = [
  ['speedThreshold', 'Speed threshold (CSS px/ms)', .2, 3, .05],
  ['lifetime', 'Lifetime (ms)', 300, 1600, 50],
  ['travel', 'Plume travel (SVG units; speed response capped at 1.5)', 20, 200, 5],
  ['blobCount', 'Wisp count per slot', 6, 10, 1],
  ['baseRadius', 'Base radius (SVG units; variation ±12)', 16, 50, 1],
  ['spread', 'Wisp spread (± degrees)', 0, 40, 1],
  ['drag', 'Drag / deceleration', 0, 1, .02],
  ['opacity', 'Plume opacity', 0, 1, .025],
  ['mistCut', 'Mist cut', 0, 1, .025],
  ['haloCut', 'Halo cut (core always 0)', 0, .25, .01],
  ['turbulence', 'Plume turbulence (SVG units)', 0, 20, 1],
  ['cooldown', 'Spawn interval (ms)', 80, 500, 10],
]
