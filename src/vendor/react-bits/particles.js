// Adapted from React Bits FREE Particles (JS/CSS), David Haz (c) 2026.
// Upstream ca44b3f9ee180676a06d7de8ec6bea84cddff85b; MIT + Commons Clause.
// License: ./LICENSE.md. Lifecycle hardening and bounded local pointer response.
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl'

const defaultColors = ['#ffffff', '#ffffff', '#ffffff'];

const hexToRgb = hex => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }
  const int = parseInt(hex.slice(0, 6), 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  uniform vec2 uPointer;
  uniform float uPointerStrength;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.z *= 10.0;

    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    vec4 mvPos = viewMatrix * mPos;

    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }

    gl_Position = projectionMatrix * mvPos;
    // Local, bounded reaction; the upstream drift/depth/colour remain unchanged.
    vec2 screenPosition = gl_Position.xy / gl_Position.w;
    vec2 away = screenPosition - uPointer;
    float proximity = 1.0 - smoothstep(0.0, 0.24, length(away));
    gl_Position.xy += normalize(away + vec2(0.0001)) * proximity
      * uPointerStrength * gl_Position.w;
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));

    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle * mix(0.35, 0.9, vRandom.z));
    }
  }
`;


export function createParticleField(container, {
  particleCount, particleSpread = 8, speed, particleColors,
  particleBaseSize = 36, pixelRatio, interactive = false, pointerTarget,
  onFailure = () => {},
}) {
  let renderer, gl, geometry, program, observer
  let animationFrameId = 0
  let disposed = false
  let previousTime
  let elapsed = 0
  let pointerStrength = 0
  let pointerTargetStrength = 0
  const pointer = [3, 3]
  const listeners = []

  function listen(target, type, handler, options) {
    target.addEventListener(type, handler, options)
    listeners.push(() => target.removeEventListener(type, handler, options))
  }
  function dispose() {
    if (disposed) return
    disposed = true
    cancelAnimationFrame(animationFrameId)
    observer?.disconnect()
    listeners.forEach(remove => remove())
    try {
      geometry?.remove()
      if (gl && program?.program && !gl.isContextLost()) gl.deleteProgram(program.program)
    } catch { /* A lost/partial context may no longer accept resource deletion. */ }
    gl?.canvas.remove()
    try { gl?.getExtension('WEBGL_lose_context')?.loseContext() } catch { /* Static fallback remains. */ }
  }
  function fail() {
    dispose()
    onFailure()
  }

  try {
    renderer = new Renderer({ dpr: pixelRatio, depth: false, alpha: true, antialias: false })
    gl = renderer.gl
    if (!gl || gl.isContextLost()) throw new Error('WebGL unavailable')
    gl.clearColor(0, 0, 0, 0)
    const camera = new Camera(gl, { fov: 15 })
    camera.position.set(0, 0, 20)
    const resize = () => {
      if (disposed || gl.isContextLost()) return
      const width = container.clientWidth, height = container.clientHeight
      if (!width || !height) return
      renderer.setSize(width, height)
      camera.perspective({ aspect: width / height })
    }
    listen(window, 'resize', resize, { passive: true })
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(resize)
      observer.observe(container)
    }
    resize()
    listen(gl.canvas, 'webglcontextlost', event => {
      event.preventDefault()
      fail()
    })

    if (interactive && pointerTarget) {
      listen(window, 'pointermove', event => {
        if (event.pointerType && event.pointerType !== 'mouse') return
        const rect = pointerTarget.getBoundingClientRect()
        const inside = event.clientX >= rect.left && event.clientX <= rect.right
          && event.clientY >= rect.top && event.clientY <= rect.bottom
        pointerTargetStrength = inside ? 0.014 : 0
        if (inside) {
          pointer[0] = (event.clientX - rect.left) / rect.width * 2 - 1
          pointer[1] = 1 - (event.clientY - rect.top) / rect.height * 2
        }
      }, { passive: true })
      listen(window, 'blur', () => { pointerTargetStrength = 0 })
    }
    const positions = new Float32Array(particleCount * 3)
    const randoms = new Float32Array(particleCount * 4)
    const colors = new Float32Array(particleCount * 3)
    const palette = particleColors?.length ? particleColors : defaultColors
    for (let i = 0; i < particleCount; i++) {
      let x, y, z, len
      do {
        x = Math.random() * 2 - 1; y = Math.random() * 2 - 1; z = Math.random() * 2 - 1
        len = x * x + y * y + z * z
      } while (len > 1 || len === 0)
      const r = Math.cbrt(Math.random())
      positions.set([x * r, y * r, z * r], i * 3)
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4)
      colors.set(hexToRgb(palette[Math.floor(Math.random() * palette.length)]), i * 3)
    }
    geometry = new Geometry(gl, {
      position: { size: 3, data: positions }, random: { size: 4, data: randoms }, color: { size: 3, data: colors },
    })
    program = new Program(gl, {
      vertex, fragment,
      uniforms: {
        uTime: { value: 0 }, uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize * pixelRatio }, uSizeRandomness: { value: 1 },
        uAlphaParticles: { value: 1 }, uPointer: { value: pointer }, uPointerStrength: { value: 0 },
      }, transparent: true, depthTest: false,
    })
    if (!gl.getProgramParameter(program.program, gl.LINK_STATUS)) throw new Error('Particle shader unavailable')
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program })
    const update = time => {
      if (disposed) return
      if (gl.isContextLost()) { fail(); return }
      // Avoid a startup jump and bound long-frame catch-up.
      const delta = previousTime === undefined ? 0 : Math.min(time - previousTime, 50)
      previousTime = time
      elapsed += delta * speed
      program.uniforms.uTime.value = elapsed * 0.001
      pointerStrength += (pointerTargetStrength - pointerStrength) * (1 - Math.exp(-delta / 180))
      program.uniforms.uPointerStrength.value = pointerStrength
      // Upstream disableRotation=true: no turning volume, warp or camera movement.
      try { renderer.render({ scene: particles, camera }) } catch { fail(); return }
      animationFrameId = requestAnimationFrame(update)
    }
    container.appendChild(gl.canvas)
    animationFrameId = requestAnimationFrame(update)
    return dispose
  } catch {
    dispose()
    onFailure()
    return () => {}
  }
}
