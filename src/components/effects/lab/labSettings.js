export const particleProof = { count: 60, speed: 3.25, opacity: .575, size: 5, distance: 200, strength: 4 }
export const arcProof = { mist: 260, halo: 160, core: 70, noiseSpeed: 5, radius: 350, pointerStrength: 500, recovery: .8 }
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

// Deliberately conspicuous diagnostic settings; never imported by production.
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
