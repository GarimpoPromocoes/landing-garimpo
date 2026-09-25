/** Apenas convites de grupo oficiais; impede links incompletos ou de outro serviço. */
export function isWhatsAppInvite(href: string): boolean {
  try {
    const url = new URL(href)
    return (
      url.protocol === 'https:' &&
      url.hostname === 'chat.whatsapp.com' &&
      url.port === '' &&
      url.username === '' &&
      url.password === '' &&
      /^\/[A-Za-z0-9]{20,30}\/?$/.test(url.pathname)
    )
  } catch {
    return false
  }
}
