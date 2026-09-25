import { readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'

// Conteúdo completo no primeiro HTML: rápido, indexável e útil mesmo sem JS.
const server = await createServer({
  mode: 'production',
  server: { middlewareMode: true },
  appType: 'custom',
})
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx')
  const html = await readFile('dist/index.html', 'utf8')
  await writeFile(
    'dist/index.html',
    html.replace('<!--app-html-->', () => renderToString(createElement(App))),
  )
} finally {
  await server.close()
}
