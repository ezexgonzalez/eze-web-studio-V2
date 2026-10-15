// QA-only JSDOM; no canvas/visual acceptance claimed.
import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { tsParticles } from '@tsparticles/engine'
import { setTimeout as wait } from 'node:timers/promises'

test('real React/provider handles native load rejection and retires replaced/unmounted containers', async () => {
  const { JSDOM } = await import(process.env.EWS_QA_JSDOM || 'jsdom')
  const dom = new JSDOM('<div id="root"></div>', { pretendToBeVisual: true })
  const previous = new Map()
  for (const [key, value] of Object.entries({ window: dom.window, document: dom.window.document,
    navigator: dom.window.navigator, IS_REACT_ACT_ENVIRONMENT: true })) {
    previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key))
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value })
  }
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } })
  const root = createRoot(document.getElementById('root'))
  const nativeLoad = tsParticles.load
  const failures = [], ready = [], containers = [], errors = []
  const originalError = console.error
  console.error = (...args) => errors.push(args.join(' '))
  const reason = new Error('native-load-rejection')
  let calls = 0
  tsParticles.load = async () => { calls++; throw reason }
  let mounted = true
  try {
    const { ParticleField } = await server.ssrLoadModule('/src/components/effects/ParticleField.jsx')
    const onFailure = e => failures.push(e), onLoaded = c => ready.push(c)
    const render = options => root.render(React.createElement(React.StrictMode, null,
      React.createElement(ParticleField, { options, onFailure, onLoaded })))
    await act(async () => { render({}); await wait(100) })
    await act(async () => { await wait(100) })
    assert.equal(calls, 1)
    assert.deepEqual(failures, [reason])
    assert.equal(ready.length, 0)
    tsParticles.load = async () => {
      calls++
      const c = { canvas: { domElement: { width: 400, height: 300 } }, particles: { count: 1 },
        destroyed: false, destroyCalls: 0, destroy() { this.destroyed = true; this.destroyCalls++ } }
      containers.push(c)
      return c
    }
    await act(async () => { render({ particles: { number: { value: 1 } } }); await wait(0) })
    assert.equal(ready.length, 1)
    const hostId = document.querySelector('.hero-particles').id
    await act(async () => { render({ particles: { number: { value: 1 } } }); await wait(0) })
    assert.equal(document.querySelector('.hero-particles').id, hostId)
    assert.equal(containers[0].destroyCalls, 1)
    assert.equal(ready.length, 2)
    await act(async () => root.unmount()); mounted = false
    assert.equal(containers[1].destroyCalls, 1)
    assert.equal(document.querySelector('.hero-particles'), null)
    assert.deepEqual(failures, [reason])
    assert.deepEqual(errors, [])
  } finally {
    if (mounted) await act(async () => root.unmount())
    tsParticles.load = nativeLoad
    console.error = originalError
    await server.close()
    dom.window.close()
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor)
      else delete globalThis[key]
    }
  }
})
