export type AnalyticsEvent =
  | { name: 'page_view'; properties: { page: '/' } }
  | {
      name: 'group_click'
      properties: { group_id: string; group_name: string; destination: 'whatsapp' }
    }

/** Ponto único de integração. Sem cookies, rede ou dados pessoais por padrão. */
export function trackEvent(event: AnalyticsEvent): void {
  window.dispatchEvent(new CustomEvent<AnalyticsEvent>('garimpo:analytics', { detail: event }))
}
