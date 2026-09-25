import type { Group } from '../data/groups'
import { trackEvent } from '../lib/analytics'
import { isWhatsAppInvite } from '../lib/links'
import { Icon } from './Icon'

export function GroupCard({ group }: { group: Group }) {
  const available = isWhatsAppInvite(group.href)
  const content = (
    <>
      <span className="group-card__icon">
        <Icon name={group.icon} />
      </span>
      <span className="group-card__content">
        <span className="group-card__name">{group.name}</span>
        <span className="group-card__description">{group.description}</span>
        <span className="group-card__cta">
          {available ? 'Entrar no grupo' : 'Em breve no WhatsApp'}
        </span>
      </span>
      {available && <Icon name="arrow" className="group-card__arrow" />}
    </>
  )

  return (
    <li
      className={`group-card group-card--${group.tone}${available ? '' : ' group-card--unavailable'}`}
    >
      {available ? (
        <a
          className="group-card__link"
          href={group.href}
          aria-label={`Entrar no ${group.name} pelo WhatsApp`}
          onClick={() =>
            trackEvent({
              name: 'group_click',
              properties: { group_id: group.id, group_name: group.name, destination: 'whatsapp' },
            })
          }
        >
          {content}
        </a>
      ) : (
        <div
          className="group-card__link"
          role="group"
          aria-label={`${group.name}: em breve no WhatsApp`}
        >
          {content}
        </div>
      )}
    </li>
  )
}
