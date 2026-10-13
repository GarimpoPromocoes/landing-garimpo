import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { groups } from '../src/data/groups'
import { promos } from '../src/data/promos'
import { site } from '../src/data/site'
import { isWhatsAppInvite } from '../src/lib/links'
import { discountPercent, formatBRL } from '../src/lib/money'

type RecordedEvent = { name: string; properties: { group_id?: string; source?: string } }

/** Captura os eventos `garimpo:analytics` e intercepta o WhatsApp: nenhum convite real é aberto. */
async function recordAnalytics(page: Page) {
  const events: RecordedEvent[] = []
  await page.exposeFunction('recordEvent', (event: RecordedEvent) => events.push(event))
  await page.addInitScript(() => {
    window.addEventListener('garimpo:analytics', ((event: CustomEvent) => {
      void (window as unknown as { recordEvent: (detail: unknown) => Promise<void> }).recordEvent(
        event.detail,
      )
    }) as EventListener)
  })
  await page.route('https://chat.whatsapp.com/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<html lang="pt-BR"><title>Destino de teste</title><body>WhatsApp de teste</body></html>',
    }),
  )
  return events
}

test('página sem erros, com estrutura acessível e assets locais', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(response.url())
  })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'A gente garimpa.Você economiza.',
  )
  await expect(page.locator('.group-card')).toHaveCount(groups.length)
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(result.violations).toEqual([])
  expect(errors).toEqual([])
})

test('grupos configurados navegam; grupos sem convite têm estado honesto', async ({ page }) => {
  await page.goto('/')
  for (const group of groups) {
    if (isWhatsAppInvite(group.href)) {
      await expect(
        page.getByRole('link', { name: `Entrar no ${group.name} pelo WhatsApp` }),
      ).toHaveAttribute('href', group.href)
    } else {
      const card = page.locator('.group-card').filter({ hasText: group.name })
      await expect(card).toContainText('Em breve no WhatsApp')
      await expect(card.getByRole('link')).toHaveCount(0)
    }
  }
})

test('layout não transborda entre 320 e 1920 px', async ({ page }) => {
  for (const width of [320, 360, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    for (const card of await page.locator('.group-card, .promo-card').all()) {
      const box = await card.boundingBox()
      expect(box!.width).toBeGreaterThan(250)
      expect(box!.height).toBeGreaterThanOrEqual(44)
    }
  }
})

test('os três grupos aparecem sem rolagem em um celular de 390 × 844', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const box = await page.locator('.group-card').last().boundingBox()
  expect(box!.y + box!.height).toBeLessThanOrEqual(844)
})

test('HTML pré-renderizado permanece legível sem JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('.group-card')).toHaveCount(groups.length)
  await expect(page.locator('.promo-card')).toHaveCount(promos.length)
  await context.close()
})

test('atalho de teclado leva aos grupos e movimento reduzido remove transições', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Ir para os grupos' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#grupos')).toBeFocused()
  expect(
    await page
      .locator('.group-card')
      .first()
      .evaluate((element) => getComputedStyle(element).transitionDuration),
  ).toBe('0s')
})

test('metadados, imagem social e ícones existem no HTML inicial', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html).toContain('lang="pt-BR"')
  expect(html).toContain('property="og:title"')
  expect(html).toContain('name="twitter:card"')
  expect(html).toContain('Garimpo Geral')
  for (const path of [
    '/og-image.png',
    '/favicon.svg',
    '/apple-touch-icon.png',
    '/fonts/dm-sans-latin.woff2',
    '/robots.txt',
  ]) {
    expect((await request.get(path)).ok()).toBe(true)
  }
})

test('CTAs ativos, eventos e navegação funcionam com mouse e teclado', async ({ page }) => {
  // A navegação real é interceptada: nenhum convite sintético chega ao WhatsApp.
  const events = await recordAnalytics(page)
  const fixtureUrl = 'http://127.0.0.1:4174/tests/fixtures/'
  for (let index = 0; index < groups.length; index++) {
    await page.goto(fixtureUrl)
    const link = page.getByRole('link', { name: `Entrar no ${groups[index].name} pelo WhatsApp` })
    await expect(link).toBeVisible()
    if (index === 1) {
      await link.focus()
      await page.keyboard.press('Enter')
    } else await link.click()
    await expect(page).toHaveURL(new RegExp('^https://chat.whatsapp.com/TESTONLY'))
    await expect
      .poll(() => events.filter((event) => event.name === 'group_click').length)
      .toBe(index + 1)
  }
  expect(
    events
      .filter((event) => event.name === 'group_click')
      .map((event) => event.properties.group_id),
  ).toEqual(groups.map((group) => group.id))
  expect(
    events
      .filter((event) => event.name === 'group_click')
      .every((e) => e.properties.source === 'list'),
  ).toBe(true)
  expect(events.filter((event) => event.name === 'page_view')).toHaveLength(groups.length)
})

test('cards ativos têm contraste e nomes acessíveis', async ({ page }) => {
  await page.goto('http://127.0.0.1:4174/tests/fixtures/')
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(result.violations).toEqual([])
})

test('vagas limitadas: selo, aviso honesto e barra só com contagem real', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.badge')).toHaveText('Vagas limitadas')
  await expect(page.locator('.groups-note')).toContainText('Quando lota, o convite fecha.')
  // Sem `members` em groups.ts, a página não exibe contagem alguma.
  const configured = groups.filter((group) => group.members !== undefined).length
  await expect(page.locator('.group-card__spots')).toHaveCount(configured)

  await page.goto('http://127.0.0.1:4174/tests/fixtures/')
  const cards = page.locator('.group-card')
  // 812 membros definidos em tests/fixtures/main.tsx.
  await expect(cards.first()).toContainText(`${site.groupCapacity - 812} vagas restantes`)
  await expect(cards.nth(1).locator('.group-card__spots')).toHaveCount(0)
})

test('promoções exibem preço, desconto, economia e cupom a partir dos dados', async ({ page }) => {
  await page.goto('/')
  const cards = page.locator('.promo-card')
  await expect(cards).toHaveCount(promos.length)
  for (const promo of promos) {
    const card = cards.filter({ hasText: promo.name })
    await expect(card).toContainText(formatBRL(promo.price))
    await expect(card).toContainText(formatBRL(promo.from))
    await expect(card).toContainText(`-${discountPercent(promo.from, promo.price)}%`)
    await expect(card).toContainText(`Economize ${formatBRL(promo.from - promo.price)}`)
    if (promo.coupon) await expect(card).toContainText(`Cupom ${promo.coupon}`)
    else await expect(card.locator('.promo-card__coupon')).toHaveCount(0)
  }
  await expect(page.locator('.deals__note')).toContainText('Preços e cupons mudam rápido')
})

test('imagens das promoções carregam', async ({ page }) => {
  await page.goto('/')
  for (const image of await page.locator('.promo-card__image').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect
      .poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth))
      .toBeGreaterThan(0)
  }
})

test('convite final leva ao primeiro grupo ativo e registra a origem', async ({ page }) => {
  const events = await recordAnalytics(page)
  const target = groups.find((group) => isWhatsAppInvite(group.href))!
  await page.goto('/')
  for (const perk of ['100% grátis', 'Sem cadastro', 'Saia quando quiser']) {
    await expect(page.locator('.closing__perks')).toContainText(perk)
  }
  await page.getByRole('link', { name: 'Escolher outro grupo' }).click()
  await expect(page.locator('#grupos')).toBeFocused()

  const cta = page.getByRole('link', { name: `Entrar no ${target.name}`, exact: true })
  await expect(cta).toHaveAttribute('href', target.href)
  await cta.click()
  await expect(page).toHaveURL(/^https:\/\/chat\.whatsapp\.com\//)
  await expect
    .poll(() => events.find((event) => event.name === 'group_click')?.properties)
    .toMatchObject({ group_id: target.id, source: 'closing' })
})
