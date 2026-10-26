import { inject } from '@vercel/analytics'

/**
 * Vercel Web Analytics: visitas, páginas, origem, país e dispositivo, sem cookies.
 * Só roda em builds da Vercel. No plano Hobby, eventos personalizados (como group_click) não aparecem no painel.
 */
export function startVercelAnalytics(): void {
  if (__VERCEL_ANALYTICS__) inject({ mode: 'production' })
}

export type AnalyticsEvent =
  | { name: 'page_view'; properties: { page: '/' } }
  | {
      name: 'group_click'
      properties: {
        group_id: string
        group_name: string
        destination: 'whatsapp'
        /** Onde estava o link: botão do topo, lista de grupos ou convite final. */
        source: 'hero' | 'list' | 'closing'
      }
    }

/** Ponto único de integração. Sem cookies, rede ou dados pessoais por padrão. */
export function trackEvent(event: AnalyticsEvent): void {
  window.dispatchEvent(new CustomEvent<AnalyticsEvent>('garimpo:analytics', { detail: event }))
}
