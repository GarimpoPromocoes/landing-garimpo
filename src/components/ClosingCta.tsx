import type { Group } from '../data/groups'
import { trackEvent } from '../lib/analytics'
import { Icon } from './Icon'

const perks = ['100% grátis', 'Sem cadastro', 'Saia quando quiser']

/** Último convite da página, para quem rolou até o fim já convencido. */
export function ClosingCta({ group }: { group: Group }) {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <h2 className="closing__title" id="closing-title">
        Ofertas boas acabam rápido.
      </h2>
      <p className="closing__text">Quem está no grupo vê primeiro.</p>
      <div className="closing__actions">
        <a
          className="closing__button"
          href={group.href}
          onClick={() =>
            trackEvent({
              name: 'group_click',
              properties: {
                group_id: group.id,
                group_name: group.name,
                destination: 'whatsapp',
                source: 'closing',
              },
            })
          }
        >
          Entrar no {group.name}
          <Icon name="arrow" className="closing__arrow" />
        </a>
        <a className="closing__alt" href="#grupos">
          Escolher outro grupo
        </a>
      </div>
      <ul className="closing__perks">
        {perks.map((perk) => (
          <li key={perk}>
            <Icon name="check" className="closing__check" />
            {perk}
          </li>
        ))}
      </ul>
    </section>
  )
}
