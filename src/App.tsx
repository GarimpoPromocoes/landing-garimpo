import { Brand } from './components/Brand'
import { ClosingCta } from './components/ClosingCta'
import { GroupCard } from './components/GroupCard'
import { Hero } from './components/Hero'
import { Reasons } from './components/Reasons'
import { Showcase } from './components/Showcase'
import { groups } from './data/groups'
import { promos } from './data/promos'
import { isWhatsAppInvite } from './lib/links'

/** Grupo dos botões verdes "Entrar no grupo": o primeiro com convite válido. */
const primaryGroup = groups.find((group) => isWhatsAppInvite(group.href))

export default function App() {
  return (
    <div className="page">
      <a className="skip-link" href="#grupos">
        Ir para os grupos
      </a>
      <div className="top">
        <img
          className="top__mascot"
          src="/art/mascote-hero.webp"
          alt=""
          width="339"
          height="264"
          fetchPriority="high"
        />
        <header className="site-header">
          <Brand />
        </header>
        <main className="main-content">
          <Hero group={primaryGroup} />
          {promos.length > 0 && <Showcase promos={promos} />}
          <section className="groups" aria-labelledby="groups-title" id="grupos" tabIndex={-1}>
            <h2 className="section-title" id="groups-title">
              Escolha <span className="text-gold">seu grupo</span>
            </h2>
            <p className="section-lead">Entre no grupo que combina com você.</p>
            <ul className="group-list">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </ul>
          </section>
          <Reasons />
          {primaryGroup && <ClosingCta group={primaryGroup} />}
        </main>
      </div>
      <footer className="site-footer">
        <p>2026 © Garimpo Promoções</p>
      </footer>
    </div>
  )
}
