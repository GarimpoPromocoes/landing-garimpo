import type { Group } from '../data/groups'
import { JoinButton } from './JoinButton'

/** Último convite da página, para quem rolou até o fim já convencido. */
export function ClosingCta({ group }: { group: Group }) {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <img
        className="closing__art"
        src="/art/mascote-cta.webp"
        alt=""
        width="393"
        height="200"
        loading="lazy"
      />
      <div className="closing__text">
        <h2 className="closing__title" id="closing-title">
          Entre agora <span className="text-gold">e aproveite</span>
        </h2>
        <p className="closing__lead">As melhores promoções, direto no WhatsApp.</p>
      </div>
      <div className="closing__action">
        <JoinButton group={group} source="closing" />
      </div>
    </section>
  )
}
