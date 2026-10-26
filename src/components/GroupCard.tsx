import type { Group } from '../data/groups'
import { site } from '../data/site'
import { trackEvent } from '../lib/analytics'
import { isWhatsAppInvite } from '../lib/links'
import { Icon } from './Icon'

function getSpots(members: number | undefined) {
  if (members === undefined) return null
  const left = Math.max(0, site.groupCapacity - members)
  return {
    filled: Math.min(100, (members / site.groupCapacity) * 100),
    label: `${left.toLocaleString('pt-BR')} ${left === 1 ? 'vaga restante' : 'vagas restantes'}`,
  }
}

export function GroupCard({ group }: { group: Group }) {
  const available = isWhatsAppInvite(group.href)
  const spots = available ? getSpots(group.members) : null
  const content = (
    <>
      <span className="group-card__icon">
        <Icon name={group.icon} />
      </span>
      <span className="group-card__content">
        <span className="group-card__name">{group.name}</span>
        <span className="group-card__description">{group.description}</span>
        {spots && (
          <span className="group-card__spots">
            <span className="group-card__spots-label">{spots.label}</span>
            <span className="group-card__meter" aria-hidden="true">
              <span className="group-card__meter-fill" style={{ width: `${spots.filled}%` }} />
            </span>
          </span>
        )}
      </span>
      {available ? (
        <>
          <span className="group-card__arrow">
            <Icon name="arrow" />
          </span>
          <span className="group-card__cta">
            <Icon name="users" />
            Entrar agora
          </span>
        </>
      ) : (
        <span className="group-card__soon">Em breve no WhatsApp</span>
      )}
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
          aria-label={`Entrar no ${group.name} pelo WhatsApp${spots ? `. ${spots.label}` : ''}`}
          onClick={() =>
            trackEvent({
              name: 'group_click',
              properties: {
                group_id: group.id,
                group_name: group.name,
                destination: 'whatsapp',
                source: 'list',
              },
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
