import test from 'node:test'
import assert from 'node:assert/strict'
import { createEditorialMotion, createFixedHeader } from '../src/utils/siteMotion.js'

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

function element(delay = 0) {
  return {
    dataset: { revealDelay: delay }, calls: [],
    contains(target) { return target === this },
    querySelector() { return this.accent || null },
    animate(frames, options) {
      const animation = { cancelled: false, cancel() { this.cancelled = true; this.oncancel?.() } }
      this.calls.push({ frames, options, animation })
      return animation
    },
  }
}
function root(...elements) {
  const scope = new Events()
  scope.querySelectorAll = selector => { assert.equal(selector, '[data-reveal]'); return elements }
  return scope
}

test('reveals once, with finite stagger and accent; cleanup rejects queued callbacks', t => {
  const { observers, preference, document } = environment(t)
  const card = element(70), feature = element(999)
  feature.accent = element()
  const scope = root(card, feature)
  const dispose = createEditorialMotion(scope)
  observers[0].enter(card)
  observers[0].enter(card)
  observers[0].enter(feature)
  assert.equal(card.calls.length, 1)
  assert.equal(card.calls[0].options.duration, 550)
  assert.equal(card.calls[0].options.delay, 70)
  assert.equal(feature.calls[0].options.delay, 210)
  assert.equal(feature.accent.calls.length, 1)
  assert.equal(card.calls[0].frames[1].translate, '0 0')
  dispose()
  assert.ok(card.calls[0].animation.cancelled)
  assert.equal(scope.count + preference.count + document.count, 0)
  observers[0].enter(element())
  assert.equal(card.calls.length, 1)
})

test('reduced motion cancels current animations and never replays seen content', t => {
  const { observers, preference } = environment(t)
  const card = element()
  preference.matches = true
  const dispose = createEditorialMotion(root(card))
  assert.equal(observers.length, 0)
  preference.matches = false
  preference.dispatchEvent(new Event('change'))
  observers[0].enter(card)
  preference.matches = true
  preference.dispatchEvent(new Event('change'))
  assert.ok(card.calls[0].animation.cancelled)
  preference.matches = false
  preference.dispatchEvent(new Event('change'))
  assert.equal(observers.at(-1).targets.size, 0)
  assert.equal(card.calls.length, 1)
  dispose()
})

test('hidden documents defer reveals; focus and unmount settle animation', t => {
  const { observers, document } = environment(t)
  document.hidden = true
  const card = element(), scope = root(card)
  const dispose = createEditorialMotion(scope)
  assert.equal(observers.length, 0)
  document.hidden = false
  document.dispatchEvent(new Event('visibilitychange'))
  observers[0].enter(card)
  card.contains = () => true
  scope.dispatchEvent(new Event('focusin'))
  assert.ok(card.calls[0].animation.cancelled)
  dispose()
})

test('missing observer or failed animation leaves visible fallback without inline hiding', t => {
  const { window, observers } = environment(t)
  const card = element()
  card.animate = () => { throw Error('Animation unavailable') }
  const dispose = createEditorialMotion(root(card))
  assert.doesNotThrow(() => observers[0].enter(card))
  assert.equal(card.style, undefined)
  dispose()
  delete window.IntersectionObserver
  const scope = root(card)
  createEditorialMotion(scope)()
  assert.equal(scope.count, 0)
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
