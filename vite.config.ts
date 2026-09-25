import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { site } from './src/data/site.ts'
import { getSiteOrigin, getMetadata, getRobots, getSitemap } from './scripts/metadata.mjs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const origin = getSiteOrigin(env.VITE_SITE_URL)
  return {
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
