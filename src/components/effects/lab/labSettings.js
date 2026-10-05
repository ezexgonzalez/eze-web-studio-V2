export const particleProof = { count: 1, speed: .1, opacity: .575, size: 1.5, distance: 200, strength: 2.4 }
export const arcProof = { mist: 0, halo: 0, core: 0, noiseSpeed: 1, radius: 110, pointerStrength: 620, recovery: 1 }
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

// Eze-exported interaction baseline; never imported by production.
export function labParticleOptions(settings, interactive) {
  return {
    fullScreen: { enable: false }, detectRetina: false, fpsLimit: 60,
    pauseOnBlur: true, pauseOnOutsideViewport: true,
    interactivity: {
      detectsOn: 'window',
      events: { onHover: { enable: interactive, mode: 'repulse' }, onClick: { enable: false } },
      modes: { repulse: { distance: settings.distance, speed: settings.strength, factor: 1, maxSpeed: settings.strength, easing: 'ease-out-quad' } },
    },
    particles: {
      number: { value: settings.count, density: { enable: false } },
      color: { value: ['#59E3FF', '#75F6FF', '#A0F8FF'] },
      // Circle eliminates sprite loading/softness as a possible blocker during proof.
      shape: { type: 'circle' },
      opacity: { value: { min: Math.max(.05, settings.opacity - .225), max: Math.min(1, settings.opacity + .225) } },
      size: { value: { min: Math.max(1, settings.size - 2), max: settings.size + 2 } },
      move: { enable: true, speed: { min: Math.max(.1, settings.speed - .75), max: settings.speed + .75 }, direction: 'none', random: false, straight: false, outModes: { default: 'out' } },
      zIndex: { value: 0, opacityRate: 0, sizeRate: 0, velocityRate: 0 },
    },
  }
}

export const haloQualityProof = { coreWidth: 5, coreBlur: 2, coreOpacity: .625, haloWidth: 20, haloBlur: 8.5, haloOpacity: .475, mistWidth: 50, mistBlur: 21, mistOpacity: .24 }
export const haloQualityControls = ['core', 'halo', 'mist'].flatMap(name => [
  [`${name}Width`, `${name.toUpperCase()} WIDTH`, 1, 100, .5],
  [`${name}Blur`, `${name.toUpperCase()} BLUR`, 0, 40, .5],
  [`${name}Opacity`, `${name.toUpperCase()} OPACITY`, 0, 1, .025],
])
export const wakeProof = { enabled: true, speedThreshold: .9, distance: 60, lifetime: 700, radius: 85, expansion: 85, opacity: .7, mistInfluence: .85, haloInfluence: .25, cooldown: 100 }
export const wakeControls = [
  ['speedThreshold', 'Speed threshold (CSS px/ms)', .2, 3, .05],
  ['distance', 'Wake impulse (SVG units; velocity multiplier capped at 1.5)', 0, 120, 5],
  ['lifetime', 'Lifetime (ms)', 200, 1500, 50],
  ['radius', 'Initial radius (SVG units)', 30, 200, 5],
  ['expansion', 'Added radius at end (SVG units)', 0, 200, 5],
  ['opacity', 'Wake copy opacity', 0, 1, .025],
  ['mistInfluence', 'Mist influence / local attenuation', 0, 1, .025],
  ['haloInfluence', 'Halo influence / local attenuation', 0, 1, .025],
  ['cooldown', 'Spawn interval (ms)', 80, 500, 10],
]
