export function getSiteOrigin(value) {
  if (!value?.trim()) return ''
  const url = new URL(value.trim())
  if (
    url.protocol !== 'https:' ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error(
      'VITE_SITE_URL precisa ser uma origem HTTPS sem caminho, parâmetros ou credenciais.',
    )
  }
  return url.origin
}

const escapeHtml = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  )

export function getMetadata(site, origin) {
  const title = escapeHtml(site.title)
  const description = escapeHtml(site.description)
  const image = origin ? `${escapeHtml(origin)}/og-image.png` : '/og-image.png'
  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="theme-color" content="${site.themeColor}" />
    <meta name="robots" content="${origin ? 'index, follow' : 'noindex, nofollow'}" />
    ${origin ? `<link rel="canonical" href="${escapeHtml(origin)}/" />` : ''}
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${site.locale}" />
    <meta property="og:site_name" content="${escapeHtml(site.name)}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    ${origin ? `<meta property="og:url" content="${escapeHtml(origin)}/" />` : ''}
    <meta property="og:image" content="${image}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Garimpo Promoções. A gente garimpa. Você economiza. Ofertas direto no WhatsApp." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="Garimpo Promoções. A gente garimpa. Você economiza." />
  `
}
export const getRobots = (origin) =>
  origin
    ? `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n'
export const getSitemap = (origin) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(origin)}/</loc></url></urlset>\n`
