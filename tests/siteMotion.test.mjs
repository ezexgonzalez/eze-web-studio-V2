import test from 'node:test'
import assert from 'node:assert/strict'
import { createSolutionHighlight, createFixedHeader } from '../src/utils/siteMotion.js'

class Events extends EventTarget {
  listeners = new Map()
  addEventListener(type, listener, options) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set())
    this.listeners.get(type).add(listener)
    super.addEventListener(type, listener, options)
  }
  removeEventListener(type, listener) {
    this.listeners.get(type)?.delete(listener)
    super.removeEventListener(type, listener)
  }
  get count() { return [...this.listeners.values()].reduce((count, listeners) => count + listeners.size, 0) }
}

function environment(t) {
  const previous = { window: globalThis.window, document: globalThis.document }
  const window = new Events()
  const document = new Events()
  const preference = new Events()
  preference.matches = false
  window.matchMedia = () => preference
  window.scrollY = 0
  document.hidden = false
  document.activeElement = null
  const properties = new Map()
  document.documentElement = { style: {
    getPropertyValue: key => properties.get(key) || '',
    setProperty: (key, value) => properties.set(key, value),
    removeProperty: key => properties.delete(key),
  } }
  const observers = []
  const resizes = []
  window.IntersectionObserver = class {
    constructor(callback, options) { this.callback = callback; this.options = options; this.targets = new Set(); observers.push(this) }
    observe(element) { this.targets.add(element) }
    unobserve(element) { this.targets.delete(element) }
    disconnect() { this.targets.clear(); this.disconnected = true }
    enter(element) { this.callback([{ target: element, isIntersecting: true }]) }
  }
  window.ResizeObserver = class {
    constructor(callback) { this.callback = callback; resizes.push(this) }
    observe() {}
    disconnect() { this.disconnected = true }
  }
  globalThis.window = window
  globalThis.document = document
  t.after(() => Object.assign(globalThis, previous))
  return { window, document, preference, properties, observers, resizes }
}

function solutionFixture() {
  const positions = [200, 450, 700]
  const features = positions.map((_, index) => ({
    dataset: {},
    removeAttribute() { delete this.dataset.readingActive },
    querySelector() { return { getBoundingClientRect: () => ({ top: positions[index], height: 80 }) } },
  }))
  return { positions, features, section: { querySelectorAll: () => features } }
}

function frames(window) {
  const pending = new Map()
  let id = 0
  window.innerHeight = 900
  window.requestAnimationFrame = callback => { pending.set(++id, callback); return id }
  window.cancelAnimationFrame = key => pending.delete(key)
  return { pending, flush() { const callbacks = [...pending.values()]; pending.clear(); callbacks.forEach(callback => callback()) } }
}

test('solution selects exactly one nearest reading word and updates during scroll', t => {
  const { window, observers } = environment(t)
  const raf = frames(window)
  const { section, features, positions } = solutionFixture()
  const dispose = createSolutionHighlight(section)
  observers[0].enter(section)
  raf.flush()
  assert.deepEqual(features.map(f => f.dataset.readingActive), [undefined, 'true', undefined])
  positions.splice(0, 3, -100, 100, 350)
  window.dispatchEvent(new Event('scroll'))
  window.dispatchEvent(new Event('scroll'))
  assert.equal(raf.pending.size, 1)
  raf.flush()
  assert.deepEqual(features.map(f => f.dataset.readingActive), [undefined, undefined, 'true'])
  positions.splice(0, 3, -500, -300, -100)
  window.dispatchEvent(new Event('scroll'))
  raf.flush()
  assert.ok(features.every(f => !f.dataset.readingActive))
  dispose()
})

test('solution has no idle loop and cleans up offscreen, resize, hidden and stale callbacks', t => {
  const { window, document, observers } = environment(t)
  const raf = frames(window)
  const { section, features } = solutionFixture()
  const dispose = createSolutionHighlight(section)
  window.dispatchEvent(new Event('scroll'))
  assert.equal(raf.pending.size, 0)
  observers[0].enter(section)
  raf.flush()
  assert.equal(raf.pending.size, 0)
  document.hidden = true
  window.dispatchEvent(new Event('scroll'))
  assert.equal(raf.pending.size, 0)
  document.hidden = false
  document.dispatchEvent(new Event('visibilitychange'))
  raf.flush()
  window.innerHeight = 600
  window.dispatchEvent(new Event('resize'))
  raf.flush()
  assert.equal(features[0].dataset.readingActive, 'true')
  observers[0].callback([{ isIntersecting: false }])
  assert.ok(features.every(f => !f.dataset.readingActive))
  observers[0].enter(section)
  assert.equal(raf.pending.size, 1)
  dispose()
  assert.equal(raf.pending.size, 0)
  assert.equal(window.count + document.count, 0)
  observers[0].enter(section)
  assert.equal(raf.pending.size, 0)
})

test('solution missing observer leaves fully visible unhighlighted fallback', t => {
  const { window } = environment(t)
  delete window.IntersectionObserver
  const { section, features } = solutionFixture()
  createSolutionHighlight(section)()
  assert.ok(features.every(f => !f.dataset.readingActive))
  assert.equal(window.count, 0)
})

test('header measures responsive obstruction, changes glass on threshold, restores ownership', t => {
  const { observers, resizes, properties } = environment(t)
  let height = 68
  const header = { dataset: {}, getBoundingClientRect: () => ({ height }), removeAttribute: () => delete header.dataset.scrolled }
  const dispose = createFixedHeader(header, {})
  assert.equal(properties.get('--header-offset'), '68px')
  assert.equal(header.dataset.scrolled, 'false')
  observers[0].callback([{ isIntersecting: false }])
  assert.equal(header.dataset.scrolled, 'true')
  height = 92
  resizes[0].callback()
  assert.equal(properties.get('--header-offset'), '92px')
  dispose()
  observers[0].callback([{ isIntersecting: false }])
  resizes[0].callback()
  assert.equal(properties.has('--header-offset'), false)
  assert.equal(header.dataset.scrolled, undefined)
  assert.ok(resizes[0].disconnected && observers[0].disconnected)
})

test('header scroll/resize fallback has cleanup and restores earlier offset', t => {
  const { window, properties } = environment(t)
  delete window.IntersectionObserver
  delete window.ResizeObserver
  properties.set('--header-offset', '90px')
  const header = { dataset: {}, getBoundingClientRect: () => ({ height: 92 }), removeAttribute: () => delete header.dataset.scrolled }
  const dispose = createFixedHeader(header, {})
  window.scrollY = 20
  window.dispatchEvent(new Event('scroll'))
  assert.equal(header.dataset.scrolled, 'true')
  assert.equal(window.count, 2)
  dispose()
  assert.equal(window.count, 0)
  assert.equal(properties.get('--header-offset'), '90px')
})
