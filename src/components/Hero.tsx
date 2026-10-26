import type { Group } from '../data/groups'
import { Icon } from './Icon'
import { JoinButton } from './JoinButton'

export function Hero({ group }: { group: Group | undefined }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 className="hero__title" id="hero-title">
        Achados reais.
        <br />
        <span className="text-gold">Preços baixos.</span>
      </h1>
      <p className="hero__lead">Ofertas todos os dias, direto no seu WhatsApp.</p>
      <div className="hero__actions">
        {group && <JoinButton group={group} source="hero" />}
        <a className="ghost-button" href="#grupos">
          <Icon name="users" className="ghost-button__icon" />
          <span>Ver grupos</span>
          <Icon name="arrow" className="ghost-button__arrow" />
        </a>
      </div>
    </section>
  )
}
