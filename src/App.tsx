import { Brand } from './components/Brand'
import { ClosingCta } from './components/ClosingCta'
import { GroupCard } from './components/GroupCard'
import { PromoCard } from './components/PromoCard'
import { groups } from './data/groups'
import { promos } from './data/promos'
import { isWhatsAppInvite } from './lib/links'

const groupNames = new Map(groups.map((group) => [group.id, group.name]))
const closingGroup = groups.find((group) => isWhatsAppInvite(group.href))

export default function App() {
  return (
    <div className="page-shell">
      <a className="skip-link" href="#grupos">
        Ir para os grupos
      </a>
      <header className="site-header">
        <Brand />
      </header>
      <main className="main-content">
        <div className="hero">
          <section className="intro" aria-labelledby="intro-title">
            <h1 id="intro-title">
              A gente garimpa.
              <br />
              Você <span className="intro__highlight">economiza.</span>
            </h1>
            <p className="intro__description">Ofertas no WhatsApp. Grupos gratuitos.</p>
          </section>
          <section
            className="groups-section"
            aria-labelledby="groups-title"
            id="grupos"
            tabIndex={-1}
          >
            <div className="groups-header">
              <h2 className="groups-heading" id="groups-title">
                Escolha seu grupo
              </h2>
              <span className="badge">Vagas limitadas</span>
            </div>
            <ul className="group-list">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </ul>
            <p className="groups-note">
              Grupos do WhatsApp têm limite de participantes. Quando lota, o convite fecha.
            </p>
          </section>
        </div>
        {promos.length > 0 && (
          <section className="deals" aria-labelledby="deals-title">
            <div className="deals__header">
              <h2 className="section-title" id="deals-title">
                O que chega no seu WhatsApp
              </h2>
              <p className="deals__lead">
                Ofertas que já passaram pelos nossos grupos: preço de antes, preço de agora e,
                quando tem, o cupom.
              </p>
            </div>
            <ul className="promo-list">
              {promos.map((promo) => (
                <PromoCard
                  key={promo.id}
                  promo={promo}
                  groupName={groupNames.get(promo.groupId) ?? 'Garimpo'}
                />
              ))}
            </ul>
            <p className="deals__note">
              Exemplos de ofertas já enviadas. Preços e cupons mudam rápido; no grupo você vê o que
              está valendo agora.
            </p>
          </section>
        )}
        {closingGroup && <ClosingCta group={closingGroup} />}
      </main>
      <footer className="site-footer">
        <p>© Garimpo Promoções</p>
      </footer>
    </div>
  )
}
