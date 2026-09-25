import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { groups } from '../src/data/groups'
import { isWhatsAppInvite } from '../src/lib/links'

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
    for (const card of await page.locator('.group-card').all()) {
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
  const events: { name: string; properties: { group_id?: string } }[] = []
  await page.exposeFunction(
    'recordEvent',
    (event: { name: string; properties: { group_id?: string } }) => events.push(event),
  )
  await page.addInitScript(() => {
    window.addEventListener('garimpo:analytics', ((event: CustomEvent) => {
      void (window as unknown as { recordEvent: (detail: unknown) => Promise<void> }).recordEvent(
        event.detail,
      )
    }) as EventListener)
  })
  // A navegação real é interceptada: nenhum convite sintético chega ao WhatsApp.
  await page.route('https://chat.whatsapp.com/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<html lang="pt-BR"><title>Destino de teste</title><body>WhatsApp de teste</body></html>',
    }),
  )
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
  expect(events.filter((event) => event.name === 'page_view')).toHaveLength(groups.length)
})

test('cards ativos têm contraste e nomes acessíveis', async ({ page }) => {
  await page.goto('http://127.0.0.1:4174/tests/fixtures/')
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(result.violations).toEqual([])
})
