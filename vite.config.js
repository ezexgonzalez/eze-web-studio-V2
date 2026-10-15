import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Preview-only final handler. Static hosts must serve dist/404.html with status
// 404 themselves; a rewrite to index.html would incorrectly produce a 200.
function staticNotFoundPreview() {
  return {
    name: 'static-not-found-preview',
    configurePreviewServer(server) {
      return () => server.middlewares.use((request, response, next) => {
        const path = request.url?.split('?')[0]
        if (!['GET', 'HEAD'].includes(request.method) ||
            ['/index.html', '/privacidad.html', '/404.html'].includes(path)) return next()
        try {
          const html = readFileSync(resolve(server.config.root, server.config.build.outDir, '404.html'))
          response.statusCode = 404
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          response.end(request.method === 'HEAD' ? undefined : html)
        } catch (error) { next(error) }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  appType: 'mpa',
  plugins: [react(), tailwindcss(), staticNotFoundPreview()],
  build: {
    rolldownOptions: { input: { main: 'index.html', privacy: 'privacidad.html', notFound: '404.html' } },
  },
})
