// Run after npm run build. HTTP/DOM checks, not browser visual certification.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { preview, createServer } from 'vite'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

test('static privacy/404 pages, actual preview statuses, assets and Footer home/privacy links', async () => {
  const { JSDOM } = await import(process.env.EWS_QA_JSDOM || 'jsdom')
  const server = await preview({ preview: { host: '127.0.0.1', port: 0, open: false } })
  const base = `http://127.0.0.1:${server.httpServer.address().port}`
  const doms = []
  const load = async (path, status) => {
    const response = await fetch(base + path)
    assert.equal(response.status, status, path)
    const text = await response.text()
    const dom = new JSDOM(text); doms.push(dom)
    return dom.window.document
  }
  let vite
  try {
    const home = await load('/', 200)
    assert.equal(home.title, 'Eze Web Studio')
    assert.equal(home.querySelector('link[rel="canonical"]').href, 'https://ezewebstudio.com.ar/')
    const privacy = await load('/privacidad', 200)
    assert.equal(privacy.querySelector('h1').textContent, 'Política de privacidad')
    assert.equal(privacy.documentElement.lang, 'es')
    assert.equal(privacy.querySelector('link[rel="canonical"]').href, 'https://ezewebstudio.com.ar/privacidad')
    assert(privacy.querySelector('.privacy-pending'))
    assert.match(privacy.body.textContent, /identificación legal.*domicilio.*pendientes/i)
    assert.match(privacy.body.textContent, /conservación.*seguridad.*pendientes/s)
    assert.match(privacy.body.textContent, /Ley argentina 25\.326/)
    assert.equal(privacy.querySelector('a[href^="mailto:"]').href, 'mailto:ezewebstudio.dev@gmail.com')
    assert.equal(privacy.querySelector('time').dateTime, '2026-10-14')
    for (const path of ['/no-existe', '/carpeta/proyecto-inexistente?origen=test', '/assets/ausente.png']) {
      const missing = await load(path, 404)
      assert.equal(missing.querySelector('h1').textContent, 'Esta página no existe.')
      assert.equal(missing.querySelector('.information-home-cta').getAttribute('href'), '/')
      assert.match(missing.querySelector('.information-home-cta').textContent, /VOLVER AL INICIO/)
      assert.equal(missing.querySelector('meta[name="robots"]').content, 'noindex')
      assert.equal(missing.querySelectorAll('script, canvas, form').length, 0)
    }
    const head = await fetch(base + '/ruta-que-no-existe', { method: 'HEAD' })
    assert.equal(head.status, 404); assert.equal(await head.text(), '')
    const sourceSymbol = await readFile('src/assets/brand/ews-symbol.svg')
    for (const doc of [privacy, await load('/404.html', 200)]) {
      assert.equal(doc.querySelectorAll('h1').length, 1)
      assert.equal(doc.querySelectorAll('script, form, canvas').length, 0)
      const symbol = doc.querySelector('.information-brand img')
      assert.deepEqual(Buffer.from(symbol.src.split(',')[1], 'base64'), sourceSymbol)
      assert.equal(doc.querySelector('.information-brand').getAttribute('aria-label'), 'Eze Web Studio — Inicio')
      for (const link of doc.querySelectorAll('link[href^="/"]')) {
        if (link.rel === 'canonical') continue
        const response = await fetch(base + link.getAttribute('href'))
        assert.equal(response.status, 200, link.href)
        if (link.rel === 'stylesheet') {
          const css = await response.text()
          assert(!css.includes('@theme'))
          assert(css.includes('--color-background:#050708'))
          assert(css.includes('--font-sans:Inter') || css.includes('--font-sans:"Inter"'))
          for (const [, url] of css.matchAll(/url\(([^)]+)\)/g)) {
            const font = await fetch(base + url.replaceAll('"', ''))
            assert.equal(font.status, 200)
            assert((await font.arrayBuffer()).byteLength > 0)
          }
        }
      }
    }
    vite = await createServer({ server: { middlewareMode: true, hmr: false, ws: false } })
    const { Footer } = await vite.ssrLoadModule('/src/components/layout/Footer.jsx')
    const footerDom = new JSDOM(renderToStaticMarkup(React.createElement(Footer))); doms.push(footerDom)
    const footer = footerDom.window.document
    assert.equal(footer.querySelector('.footer-privacy').getAttribute('href'), '/privacidad')
    assert.equal(footer.querySelector('.footer-privacy').tabIndex, 0)
    assert.equal(footer.querySelector('.footer-back-to-top').getAttribute('href'), '#inicio')
    assert.equal(footer.querySelectorAll('.footer-navigation a').length, 4)
    assert.equal(footer.querySelector('.footer-wordmark').textContent, 'EZE WEB STUDIO')
    const config = JSON.parse(await readFile('vercel.json', 'utf8'))
    assert.deepEqual(config, { cleanUrls: true })
  } finally {
    await vite?.close()
    await server.close()
    doms.forEach(dom => dom.window.close())
  }
})
