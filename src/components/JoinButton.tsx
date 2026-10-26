import type { Group } from '../data/groups'
import { trackEvent } from '../lib/analytics'
import { Icon } from './Icon'

/** Botão verde principal: leva direto ao primeiro grupo ativo. */
export function JoinButton({ group, source }: { group: Group; source: 'hero' | 'closing' }) {
  return (
    <a
      className="join-button"
      href={group.href}
      aria-label={`Entrar no grupo: ${group.name}`}
      onClick={() =>
        trackEvent({
          name: 'group_click',
          properties: {
            group_id: group.id,
            group_name: group.name,
            destination: 'whatsapp',
            source,
          },
        })
      }
    >
      <Icon name="whatsapp" className="join-button__icon" />
      <span>Entrar no grupo</span>
      <Icon name="arrow" className="join-button__arrow" />
    </a>
  )
}
