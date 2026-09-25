import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import { groups } from '../src/data/groups.ts'

const font = (await readFile('public/fonts/dm-sans-latin.woff2')).toString('base64')
const logo = (await readFile('public/favicon.svg')).toString('base64')
const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  )
const categories = groups
  .map((group) => escapeHtml(group.name.replace(/^Garimpo /, '')))
  .join(' &nbsp;·&nbsp; ')
const browser = await chromium.launch()
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })
  await page.setContent(`<!doctype html><html lang="pt-BR"><head><style>
    @font-face { font-family: DM; src: url(data:font/woff2;base64,${font}); font-weight: 100 1000; }
    * { box-sizing: border-box; } body { margin:0; background:#f8f7f3; color:#292d28; font-family:DM,sans-serif; }
    main { padding:54px 66px; height:630px; position:relative; overflow:hidden; }
    .brand { display:flex; align-items:center; gap:10px; } .brand img { width:48px; height:48px; }
    .word { font-size:34px; letter-spacing:-1.8px; font-weight:850; line-height:1; } .word b { color:#b44d2a; }
    .sub { font-size:10px; letter-spacing:4px; text-transform:uppercase; margin-top:6px; }
    h1 { font-size:78px; font-weight:600; letter-spacing:-4px; line-height:1.07; margin:55px 0 20px; } h1 span { color:#b44d2a; }
    .description { font-size:24px; color:#686c63; margin:0; }
    footer { position:absolute; left:66px; right:66px; bottom:48px; padding-top:24px; border-top:1px solid #dcded4; display:flex; justify-content:space-between; color:#575d51; font-size:17px; }
    .illustration { position:absolute; right:40px; top:140px; width:300px; height:300px; transform:rotate(9deg); }
    .label { position:absolute; top:62px; right:68px; font-size:14px; color:#686c63; }
  </style></head><body><main>
    <div class="brand"><img src="data:image/svg+xml;base64,${logo}" alt=""><div><div class="word">garimpo<b>.</b></div><div class="sub">promoções</div></div></div>
    <div class="label">Menos busca. Mais achados.</div>
    <h1>A gente garimpa.<br>Você <span>economiza.</span></h1>
    <p class="description">As melhores ofertas, sem precisar procurar.</p>
    <svg class="illustration" viewBox="0 0 300 300" fill="none"><path d="M97 48h106l59 81-112 148L38 129l59-81Z" fill="#ede4d7"/><path d="m99 50 51 224 51-224M40 129h220M99 50l51 79 51-79" stroke="#f8f7f3" stroke-width="3"/><path d="m242 38 4 14 14 4-14 4-4 14-4-14-14-4 14-4 4-14Z" fill="#b44d2a"/></svg>
    <footer><span>Grupos gratuitos no WhatsApp</span><span>${categories}</span></footer>
  </main></body></html>`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'public/og-image.png' })
  await page.setViewportSize({ width: 180, height: 180 })
  await page.setContent(
    `<html><body style="margin:0;background:#f8f7f3"><img src="data:image/svg+xml;base64,${logo}" style="width:180px;height:180px" alt=""></body></html>`,
  )
  await page.screenshot({ path: 'public/apple-touch-icon.png' })
  process.stdout.write(
    'Assets gerados: og-image.png (1200 × 630) e apple-touch-icon.png (180 × 180).\n',
  )
} finally {
  await browser.close()
}
