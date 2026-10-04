import dust from '../../assets/hero/light-dust.svg'
import blueDust from '../../assets/hero/light-dust-blue.svg'
import paleDust from '../../assets/hero/light-dust-pale.svg'

export function heroParticleOptions(desktop, interactive, pixelRatio = 1) {
  const images = [dust, blueDust, paleDust].map((src, index) => ({ src, name: `hero-dust-${index}`, width: 40, height: 40, replaceColor: false }))
  return {
    fullScreen: { enable: false },
    fpsLimit: desktop ? 60 : 30,
    // Native retina mode is unbounded. Opt out above 1.5 rather than patching the engine.
    detectRetina: desktop && pixelRatio <= 1.5,
    pauseOnBlur: true, pauseOnOutsideViewport: true,
    preload: images,
    interactivity: {
      detectsOn: 'window',
      events: { onHover: { enable: desktop && interactive, mode: 'repulse' }, onClick: { enable: false } },
      modes: { repulse: { distance: 110, speed: .7, factor: 1, maxSpeed: .7, easing: 'ease-out-quad' } },
    },
    particles: {
      number: { value: desktop ? 60 : 24, density: { enable: false } },
      color: { value: ['#59E3FF', '#75F6FF', '#A0F8FF'] },
      shape: { type: 'image', options: { image: images } },
      opacity: { value: { min: .18, max: .65 }, animation: { enable: true, speed: .35, sync: false, startValue: 'random' } },
      size: { value: { min: 2.5, max: desktop ? 5 : 4 }, animation: { enable: true, speed: .65, sync: false, startValue: 'random' } },
      move: { enable: true, speed: desktop ? { min: .45, max: .9 } : { min: .25, max: .5 }, direction: 'none', random: false, straight: false, outModes: { default: 'out' } },
      zIndex: { value: { min: 0, max: 100 }, opacityRate: .25, sizeRate: .3, velocityRate: .4 },
    },
  }
}
