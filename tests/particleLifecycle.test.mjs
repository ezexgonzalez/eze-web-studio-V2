import test from 'node:test'
import assert from 'node:assert/strict'
import { setTimeout as wait } from 'node:timers/promises'
import { loadParticleContainer } from '../src/components/effects/loadParticleContainer.js'

const flush = () => wait(0)
const makeContainer = () => ({
  canvas: { domElement: { width: 640, height: 480 } },
  particles: { count: 1 }, destroyed: false, destroyCalls: 0,
  destroy() { this.destroyed = true; this.destroyCalls++ },
})
function mount(load, overrides = {}) {
  const ready = [], failures = []
  const cleanup = loadParticleContainer({ load, onLoaded: c => ready.push(c),
    onFailure: e => failures.push(e), timeout: 20, ...overrides })
  return { cleanup, ready, failures }
}

test('native rejection is handled immediately with its real reason', async () => {
  const reason = new Error('injected native tsParticles.load rejection')
  const state = mount(() => Promise.reject(reason))
  await flush()
  assert.deepEqual(state.failures, [reason])
  assert.deepEqual(state.ready, [])
  await wait(30)
  assert.equal(state.failures.length, 1)
  state.cleanup()
})

test('timeout reports once and destroys a container that resolves late', async () => {
  let resolve
  const state = mount(() => new Promise(r => { resolve = r }))
  await wait(30)
  assert.match(state.failures[0].message, /did not load/)
  const container = makeContainer()
  resolve(container)
  await flush()
  assert.equal(container.destroyCalls, 1)
  assert.equal(state.ready.length, 0)
  state.cleanup()
  assert.equal(container.destroyCalls, 1)
})

test('unmount before resolution destroys late load without callbacks', async () => {
  let resolve
  const state = mount(() => new Promise(r => { resolve = r }))
  await flush()
  state.cleanup()
  const container = makeContainer()
  resolve(container)
  await flush()
  assert.equal(container.destroyCalls, 1)
  assert.deepEqual(state.ready, [])
  assert.deepEqual(state.failures, [])
})

test('unmount before rejection handles the promise without reporting stale state', async () => {
  let reject
  const state = mount(() => new Promise((_, r) => { reject = r }))
  await flush()
  state.cleanup()
  reject(new Error('late rejection'))
  await flush()
  assert.deepEqual(state.failures, [])
})

test('successful load clears timeout and cleanup destroys exactly once', async () => {
  const container = makeContainer()
  const state = mount(() => Promise.resolve(container))
  await wait(30)
  assert.deepEqual(state.ready, [container])
  assert.deepEqual(state.failures, [])
  state.cleanup()
  state.cleanup()
  assert.equal(container.destroyCalls, 1)
})

test('StrictMode setup-cleanup-setup does not create a duplicate engine load', async () => {
  let calls = 0
  const container = makeContainer()
  const load = () => { calls++; return Promise.resolve(container) }
  const first = mount(load)
  first.cleanup()
  const second = mount(load)
  await flush()
  assert.equal(calls, 1)
  assert.deepEqual(first.ready, [])
  assert.deepEqual(second.ready, [container])
  second.cleanup()
  assert.equal(container.destroyCalls, 1)
})

test('invalid canvas, synchronous load and rejected ready callback use fallback', async () => {
  const invalid = makeContainer()
  invalid.canvas.domElement.width = 0
  const first = mount(() => invalid)
  const reason = new Error('synchronous error')
  const second = mount(() => { throw reason })
  const valid = makeContainer()
  const third = mount(() => valid, { onLoaded: async () => { throw reason } })
  await flush()
  assert.match(first.failures[0].message, /no live canvas/)
  assert.equal(invalid.destroyCalls, 1)
  assert.deepEqual(second.failures, [reason])
  assert.deepEqual(third.failures, [reason])
  assert.equal(valid.destroyCalls, 1)
  first.cleanup(); second.cleanup(); third.cleanup()
})
