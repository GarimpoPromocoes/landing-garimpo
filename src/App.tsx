import { Brand } from './components/Brand'
import { GroupCard } from './components/GroupCard'
import { groups } from './data/groups'

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
          <h2 className="groups-heading" id="groups-title">
            Escolha seu grupo
          </h2>
          <ul className="group-list">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </ul>
        </section>
      </main>
      <footer className="site-footer">
        <p>© Garimpo Promoções</p>
      </footer>
    </div>
  )
}
