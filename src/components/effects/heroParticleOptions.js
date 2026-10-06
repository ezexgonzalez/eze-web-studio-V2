import { createParticleOptions } from './particleOptions.js'
import { particleSettings } from './heroMotionSettings.js'

export function heroParticleOptions(interactive) {
  return createParticleOptions(particleSettings, interactive)
}
