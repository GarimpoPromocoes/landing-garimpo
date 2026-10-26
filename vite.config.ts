import { readFileSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { site } from './src/data/site.ts'
import { getSiteOrigin, getMetadata, getRobots, getSitemap } from './scripts/metadata.mjs'

type VercelHeaders = { headers: { source: string; headers: { key: string; value: string }[] }[] }

/** Cabeçalhos de segurança de vercel.json, repetidos no `vite preview` para os testes pegarem violações de CSP. */
function getSecurityHeaders(): Record<string, string> {
  const config = JSON.parse(readFileSync('vercel.json', 'utf8')) as VercelHeaders
  const rule = config.headers.find((entry) => entry.source === '/(.*)')
  return Object.fromEntries((rule?.headers ?? []).map(({ key, value }) => [key, value]))
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const origin = getSiteOrigin(env.VITE_SITE_URL)
  return {
    // O script do Vercel Web Analytics só existe em deploys da Vercel (/_vercel/insights).
    define: { __VERCEL_ANALYTICS__: JSON.stringify(env.VERCEL === '1') },
    preview: { headers: getSecurityHeaders() },
    plugins: [
      react(),
      {
        name: 'garimpo-metadata',
        transformIndexHtml: (html: string) =>
          html.replace('<!--site-metadata-->', getMetadata(site, origin)),
        generateBundle() {
          this.emitFile({ type: 'asset', fileName: 'robots.txt', source: getRobots(origin) })
          if (origin)
            this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: getSitemap(origin) })
        },
      },
    ],
  }
})
