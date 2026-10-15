// Preserve the option mapping used by the approved Lab export.
export function createParticleOptions(settings, interactive) {
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

