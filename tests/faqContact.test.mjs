// QA-only DOM dependency outside the repository; same setup as carousel tests.
// EWS_QA_JSDOM=/absolute/path/to/jsdom/lib/api.js node --test tests/faqContact.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import { renderToStaticMarkup } from 'react-dom/server'

const approved = [
  ['precio', '¿Cuánto cuesta una landing page?', 'El precio depende del contenido, las funcionalidades y el alcance del proyecto. Contame qué necesitás y te preparo una propuesta con el precio y lo que incluye.'],
  ['antes-de-empezar', '¿Qué necesito tener antes de empezar?', 'Con contarme sobre tu negocio y qué querés lograr ya podemos empezar. Si tenés textos, fotos o identidad visual, genial. Si no, vemos juntos qué hace falta.'],
  ['tiempos', '¿Cuánto tarda una landing page?', 'Depende del alcance y de los materiales disponibles. Antes de comenzar te comparto un plazo estimado para que sepas qué esperar.'],
  ['cambios', '¿Puedo pedir cambios durante el proceso?', 'Sí. Antes de empezar acordamos las instancias de revisión y los ajustes incluidos, para que el proceso sea claro desde el principio.'],
  ['publicacion', '¿La página queda lista para publicar?', 'Sí, la landing se entrega preparada para salir online. Definimos previamente los detalles de dominio, hosting y publicación según lo que necesites.'],
]

test('08T exact FAQ content, single-open/native focus/ARIA and approved contact/nav destinations', async () => {
  const { JSDOM } = await import(process.env.EWS_QA_JSDOM || 'jsdom')
  const dom = new JSDOM('<div id="root"></div>', { pretendToBeVisual: true, url: 'http://localhost/' })
  const previous = new Map()
  for (const [key, value] of Object.entries({ window: dom.window, document: dom.window.document, navigator: dom.window.navigator, IS_REACT_ACT_ENVIRONMENT: true })) {
    previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key))
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value })
  }
  const errors = [], oldError = console.error
  console.error = (...args) => errors.push(args.join(' '))
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } })
  const root = createRoot(document.getElementById('root'))
  let mounted = true
  try {
    const { faqItems } = await server.ssrLoadModule('/src/data/faq.js')
    const { contact } = await server.ssrLoadModule('/src/data/contact.js')
    const { navigation } = await server.ssrLoadModule('/src/data/navigation.js')
    const { FAQSection } = await server.ssrLoadModule('/src/components/sections/FAQSection.jsx')
    const { ContactSection } = await server.ssrLoadModule('/src/components/sections/ContactSection.jsx')
    assert.deepEqual(faqItems.map(item => [item.id, item.question, item.answer]), approved)
    assert(faqItems.every(item => !item.desktopAnswerLines))
    await act(async () => root.render(React.createElement(React.StrictMode, null,
      React.createElement(FAQSection), React.createElement(ContactSection))))
    const buttons = [...document.querySelectorAll('.faq-toggle')]
    assert.equal(buttons.length, 5)
    const panels = [...document.querySelectorAll('.faq-panel')]
    assert.equal(panels.length, 5)
    const open = () => buttons.filter(button => button.getAttribute('aria-expanded') === 'true')
    function verifyPanels(selected) {
      buttons.forEach((button, index) => {
        assert.equal(button.tagName, 'BUTTON'); assert.equal(button.type, 'button')
        assert(!button.disabled); assert.equal(button.tabIndex, 0)
        assert.equal(button.querySelector('.faq-question').textContent, approved[index][1])
        const panel = document.getElementById(button.getAttribute('aria-controls'))
        assert(panel); assert.equal(panel.getAttribute('role'), 'region')
        assert.equal(panel.getAttribute('aria-labelledby'), button.id)
        assert.equal(panel.textContent, approved[index][2])
        assert.equal(panel.getAttribute('aria-hidden'), String(index !== selected))
        assert.equal(panel.hasAttribute('inert'), index !== selected)
      })
    }
    assert.equal(open().length, 1); verifyPanels(0)
    await act(async () => buttons[0].click()); verifyPanels(-1)
    for (let index = 0; index < 5; index++) {
      buttons[index].focus()
      assert.equal(document.activeElement, buttons[index])
      await act(async () => buttons[index].click())
      assert.equal(open().length, 1); assert.equal(open()[0], buttons[index])
      assert.equal(document.activeElement, buttons[index]); verifyPanels(index)
    }
    await act(async () => buttons[4].click()); verifyPanels(-1); assert.equal(open().length, 0)

    const cta = document.querySelector('.contact-cta')
    const links = [...document.querySelectorAll('.contact-detail-value a')]
    assert.equal(cta.getAttribute('href'), 'https://wa.me/5491161993279')
    assert.equal(cta.target, '_blank'); assert.equal(cta.rel, 'noopener noreferrer')
    assert(!cta.hasAttribute('disabled'))
    assert.equal(links.length, 2)
    assert.equal(links[0].textContent, 'ezewebstudio.dev@gmail.com')
    assert.equal(links[0].getAttribute('href'), 'mailto:ezewebstudio.dev@gmail.com')
    assert(!links[0].hasAttribute('target'))
    assert.equal(links[1].textContent, '@ezewebstudio')
    assert.equal(links[1].getAttribute('href'), 'https://www.instagram.com/ezewebstudio/')
    assert.equal(links[1].target, '_blank'); assert.equal(links[1].rel, 'noopener noreferrer')
    for (const link of [cta, ...links]) { link.focus(); assert.equal(document.activeElement, link) }
    assert.equal(navigation.cta.href, '#contacto'); assert.equal(navigation.cta.external, false)
    assert.equal(contact.emailHref, 'mailto:ezewebstudio.dev@gmail.com')

    const { default: App } = await server.ssrLoadModule('/src/App.jsx')
    const app = renderToStaticMarkup(React.createElement(App))
    const appDom = new JSDOM(app)
    const appDocument = appDom.window.document
    const headerCta = appDocument.querySelector('.header-cta')
    const heroCta = appDocument.querySelector('.hero-outline')
    assert.equal(headerCta.getAttribute('href'), '#contacto')
    assert.equal(heroCta.getAttribute('href'), '#contacto')
    const ids = [...appDocument.querySelectorAll('[id]')].map(node => node.id)
    assert.equal(ids.length, new Set(ids).size)
    assert(!app.includes('hola@ezewebstudio.com'))
    assert(!app.includes('¿Qué tipo de páginas hacés?'))
    assert(!app.includes('Diseñamos landing pages para negocios, servicios y proyectos'))
    appDom.window.close()
    await act(async () => root.unmount()); mounted = false
    assert.equal(errors.length, 0, errors.join('\n'))
    console.log('PASS FAQ exact5answers/DOMsingle-open/focus/ARIA/inert; exact contact links; Navbar/Hero anchors; no legacy runtime copy. Not browser keyboard/layout or external-client launch QA.')
  } finally {
    if (mounted) await act(async () => root.unmount())
    await server.close(); console.error = oldError; dom.window.close()
    for (const [key, descriptor] of previous) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key] }
  }
})
