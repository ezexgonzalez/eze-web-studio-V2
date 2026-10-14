// Isolated QA fixture. Never imported by App or included in production data.
// EWS_QA_JSDOM=/absolute/path/to/jsdom/lib/api.js node --test tests/projectCarousel.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'

const fixture = Array.from({ length: 3 }, (_, index) => ({
  id: `qa-only-${index + 1}`, category: `QA CATEGORY ${index + 1}`,
  title: `TEST ONLY — Project ${index + 1}`, description: `Isolated QA description ${index + 1}.`,
  preview: null, url: index === 1 ? 'https://example.test/qa-only-project-2' : null,
}))

test('real Embla React: controls, keyboard, mouse/touch drag, sync, resize, reduced and cleanup', async () => {
  const { JSDOM } = await import(process.env.EWS_QA_JSDOM || 'jsdom')
  const dom = new JSDOM('<div id="root"></div>', { pretendToBeVisual: true, url: 'http://localhost/' })
  const win = dom.window
  const previous = new Map()
  const expose = (key, value) => { previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key)); Object.defineProperty(globalThis, key, { configurable: true, writable: true, value }) }
  for (const key of ['window', 'document', 'navigator', 'HTMLElement', 'MutationObserver']) expose(key, key === 'window' ? win : key === 'document' ? win.document : win[key])
  expose('IS_REACT_ACT_ENVIRONMENT', true)
  let viewportWidth = 1280, slideWidth = 540, step = 320, slideHeight = 365
  const media = new Map()
  win.matchMedia = query => {
    if (!media.has(query)) {
      const result = new win.EventTarget()
      result.matches = false; result.media = query
      media.set(query, result)
    }
    return media.get(query)
  }
  const raf = new Map()
  let rafId = 0, time = 0
  win.requestAnimationFrame = callback => { raf.set(++rafId, callback); return rafId }
  win.cancelAnimationFrame = id => raf.delete(id)
  const resizes = []
  class ResizeObserver {
    nodes = new Set()
    constructor(callback) { this.callback = callback; resizes.push(this) }
    observe(node) { this.nodes.add(node) }
    disconnect() { this.nodes.clear(); this.disconnected = true }
  }
  class IntersectionObserver {
    constructor(callback) { this.callback = callback }
    observe(node) { this.callback([{ target: node, isIntersecting: true, intersectionRatio: 1 }]) }
    disconnect() {}
  }
  expose('ResizeObserver', ResizeObserver)
  expose('IntersectionObserver', IntersectionObserver)
  win.ResizeObserver = ResizeObserver; win.IntersectionObserver = IntersectionObserver
  for (const [key, read] of Object.entries({
    offsetWidth: node => node.classList.contains('projects-slide') ? slideWidth : viewportWidth,
    offsetHeight: () => slideHeight,
    offsetTop: () => 0,
    offsetParent: node => node.parentElement,
    offsetLeft: node => node.classList.contains('projects-slide') ? [...node.parentElement.children].indexOf(node) * step : 0,
  })) Object.defineProperty(win.HTMLElement.prototype, key, { configurable: true, get() { return read(this) } })
  const errors = []
  const oldError = console.error
  console.error = (...args) => errors.push(args.join(' '))
  const server = await createServer({ server: { middlewareMode: true } })
  let root
  try {
    const { ProjectsSection } = await server.ssrLoadModule('/src/components/sections/ProjectsSection.jsx')
    const { projects } = await server.ssrLoadModule('/src/data/projects.js')
    root = createRoot(win.document.getElementById('root'))
    async function render(items) { await act(async () => root.render(React.createElement(React.StrictMode, null, React.createElement(ProjectsSection, { items })))) }
    async function frames(count = 180) {
      await act(async () => {
        for (let i = 0; i < count && raf.size; i++) {
          const jobs = [...raf.values()]; raf.clear(); time += 1000 / 60
          jobs.forEach(job => job(time))
        }
      })
    }
    const find = selector => win.document.querySelector(selector)
    const previousButton = () => find('.projects-previous')
    const nextButton = () => find('.projects-next')
    const viewport = () => find('.projects-viewport')
    async function click(button) { await act(async () => button.click()); await frames() }
    function selected(index) {
      assert.equal(find('#project-title').textContent, fixture[index].title)
      assert.equal(find('.project-category').textContent, fixture[index].category)
      assert.equal(find('.project-description').textContent, fixture[index].description)
      assert.equal(find('.projects-pagination').textContent, `0${index + 1}/03`)
      assert.match(find('[role="status"]').textContent, new RegExp(`Proyecto ${index + 1} de 3`))
      assert.equal(findAll('.projects-slide[data-active="true"]').length, 1)
      assert.equal(findAll('.projects-slide[data-active="true"]')[0], findAll('.projects-slide')[index])
      const cta = find('.projects-cta')
      if (fixture[index].url) assert.equal(cta.getAttribute('href'), fixture[index].url)
      else { assert.equal(cta.tagName, 'BUTTON'); assert(cta.disabled); assert(!cta.hasAttribute('href')) }
    }
    function findAll(selector) { return [...win.document.querySelectorAll(selector)] }
    async function key(value) {
      viewport().focus()
      await act(async () => viewport().dispatchEvent(new win.KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true })))
      await frames()
    }
    await render(fixture); await frames(); selected(0)
    assert(previousButton().disabled); assert(!nextButton().disabled)
    assert.equal(findAll('.projects-decoration').length, 0)
    assert.equal(findAll('article').length, 1)
    const initialTransform = find('.projects-track').style.transform
    await click(nextButton()); selected(1)
    assert.notEqual(find('.projects-track').style.transform, initialTransform)
    await click(nextButton()); selected(2); assert(nextButton().disabled)
    await click(nextButton()); selected(2)
    await click(previousButton()); selected(1)
    await key('Home'); selected(0)
    await key('ArrowRight'); selected(1)
    await key('End'); selected(2)
    await key('ArrowRight'); selected(2); assert(nextButton().disabled)
    await key('ArrowLeft'); selected(1)
    await key('Home'); selected(0)

    let eventTime = 1000
    function mouse(type, x, target) {
      const event = new win.MouseEvent(type, { clientX: x, clientY: 100, button: 0, buttons: type === 'mouseup' ? 0 : 1, bubbles: true, cancelable: true })
      Object.defineProperty(event, 'timeStamp', { value: eventTime += 40 })
      target.dispatchEvent(event)
    }
    const beforeDrag = find('.projects-track').style.transform
    await act(async () => mouse('mousedown', 800, viewport()))
    await act(async () => mouse('mousemove', 650, win.document)); await frames(8)
    await act(async () => mouse('mousemove', 450, win.document)); await frames(8)
    assert.notEqual(find('.projects-track').style.transform, beforeDrag, 'Embla track must move during mouse drag')
    await act(async () => mouse('mouseup', 450, win.document)); await frames(); selected(1)

    // Requested Desktop checkpoints: actual engine reInit and centered snap math.
    for (const [width, height, container] of [[1366, 768, 1270], [1440, 900, 1280], [1536, 864, 1280], [1920, 945, 1280]]) {
      viewportWidth = container
      slideHeight = Math.min(365, Math.max(299, 365 + (height - 900) * .5))
      await act(async () => resizes.filter(o => !o.disconnected).forEach(o => o.callback([{ target: find('.projects-track') }])))
      await frames(); selected(1)
      const x = Number(find('.projects-track').style.transform.match(/translate3d\(([-.\d]+)px/)[1])
      assert(Math.abs(x + step + slideWidth / 2 - container / 2) < 1, `${width} centered selected snap`)
    }

    // ResizeObserver exercises Embla's actual reInit, preserving selection.
    viewportWidth = 342; slideWidth = 310; step = 326; slideHeight = 210
    await act(async () => resizes.filter(o => !o.disconnected).forEach(o => o.callback([{ target: find('.projects-track') }])))
    await frames(); selected(1)
    await key('Home'); selected(0)
    function touch(type, x) {
      const event = new win.Event(type, { bubbles: true, cancelable: true })
      Object.defineProperty(event, 'touches', { value: [{ clientX: x, clientY: 100 }] })
      Object.defineProperty(event, 'timeStamp', { value: eventTime += 40 })
      viewport().dispatchEvent(event)
    }
    await act(async () => touch('touchstart', 290))
    await act(async () => touch('touchmove', 150)); await frames(8)
    await act(async () => touch('touchmove', 20)); await frames(8)
    await act(async () => touch('touchend', 20)); await frames(); selected(1)

    const reduced = media.get('(prefers-reduced-motion: reduce)')
    reduced.matches = true
    await act(async () => reduced.dispatchEvent(new win.Event('change'))); await frames(); selected(1)
    const beforeReduced = find('.projects-track').style.transform
    await act(async () => nextButton().click()); selected(2)
    assert.notEqual(find('.projects-track').style.transform, beforeReduced, 'reduced snap is applied immediately')
    await frames(); selected(2)
    await key('Home'); selected(0)
    await act(async () => touch('touchstart', 290))
    await act(async () => touch('touchmove', 140)); await frames(8)
    await act(async () => touch('touchmove', 10)); await frames(8)
    await act(async () => touch('touchend', 10)); selected(1)
    await frames(); selected(1)

    // Return to Desktop after touch/reduced; no independent controller/index.
    viewportWidth = 1280; slideWidth = 540; step = 320; slideHeight = 365
    await act(async () => resizes.filter(o => !o.disconnected).forEach(o => o.callback([{ target: find('.projects-track') }])))
    await frames(); selected(1)

    // Approved single record now has a real preview/demo; fixture null states above remain genuine.
    await render(projects); await frames()
    assert.equal(findAll('.projects-slide').length, 1)
    assert.equal(find('.projects-pagination').textContent, '01/01')
    assert(previousButton().disabled && nextButton().disabled)
    const approvedCta = find('.projects-cta')
    assert.equal(approvedCta.tagName, 'A')
    assert.equal(approvedCta.getAttribute('href'), 'https://eze-demo-gimnasio.vercel.app/')
    assert.equal(approvedCta.getAttribute('target'), '_blank')
    assert.equal(approvedCta.getAttribute('rel'), 'noopener noreferrer')
    assert(!approvedCta.hasAttribute('disabled'))
    assert.equal(findAll('article').length, 1)
    assert.equal(viewport().getAttribute('tabindex'), null)
    assert.equal(findAll('.project-preview').length, 1)
    assert.equal(find('.project-preview').getAttribute('src'), projects[0].preview)
    assert.equal(findAll('.projects-decoration .project-preview').length, 0)
    assert.equal(findAll('.projects-decoration[aria-hidden="true"]').length, 1)
    // FAQ logic regression with approved dataset (no new answers).
    const { FAQSection } = await server.ssrLoadModule('/src/components/sections/FAQSection.jsx')
    await act(async () => root.render(React.createElement(FAQSection)))
    await frames()
    const questions = findAll('.faq-toggle')
    assert.equal(questions.length, 5)
    assert.equal(questions[0].getAttribute('aria-expanded'), 'true')
    assert(questions.slice(1).every(button => button.disabled))
    await act(async () => questions[0].click())
    assert.equal(questions[0].getAttribute('aria-expanded'), 'false')
    assert.equal(find('.faq-panel').getAttribute('aria-hidden'), 'true')
    assert(find('.faq-panel').hasAttribute('inert'))
    await act(async () => questions[0].click())
    assert.equal(questions[0].getAttribute('aria-expanded'), 'true')
    assert.equal(find('.faq-panel').getAttribute('aria-hidden'), 'false')
    await act(async () => root.unmount()); root = null
    await frames()
    assert(resizes.every(o => o.disconnected))
    assert.equal(raf.size, 0)
    assert.equal(errors.length, 0, errors.join('\n'))
    console.log('PASS actual Embla8 engine + React DOM: three test records, control/key/mouse/touch/sync/resize/reduced/one-record/cleanup. Layout and pointer events are simulated; not browser visual QA.')
  } finally {
    if (root) await act(async () => root.unmount())
    await server.close()
    console.error = oldError
    dom.window.close()
    for (const [key, descriptor] of previous) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key] }
  }
})
