import { Brand } from './components/Brand'
import { GroupCard } from './components/GroupCard'
import { Icon } from './components/Icon'
import { groups } from './data/groups'

export default function App() {
  return (
    <div className="page-shell">
      <a className="skip-link" href="#grupos">
        Ir para os grupos
      </a>
      <header className="site-header">
        <Brand />
        <span className="header-note">
          <Icon name="whatsapp" /> Bons achados, direto no WhatsApp.
        </span>
      </header>
      <main className="main-content">
        <section className="intro" aria-labelledby="intro-title">
          <p className="eyebrow">
            <span /> O bom de encontrar. Sem procurar.
          </p>
          <h1 id="intro-title">
            A gente garimpa.
            <br />
            Você <span className="intro__highlight">economiza.</span>
          </h1>
          <p className="intro__description">
            As melhores ofertas da internet,
            <br className="desktop-break" /> sem você precisar procurar.
          </p>
          <div className="intro__details">
            <span>
              <Icon name="check" /> Grupos gratuitos
            </span>
            <span>
              <Icon name="whatsapp" /> Direto no WhatsApp
            </span>
          </div>
          <div className="editorial-note" aria-hidden="true">
            <svg width="65" height="37" viewBox="0 0 65 37" fill="none">
              <path
                d="M3 6c10 27 42 28 56 9M43 16l17-4-2 17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              O próximo achado
              <br />
              tem a sua cara.
            </span>
          </div>
        </section>
        <section
          className="groups-section"
          aria-labelledby="groups-title"
          id="grupos"
          tabIndex={-1}
        >
          <div className="groups-heading">
            <div>
              <p className="section-index">ESCOLHA O SEU GARIMPO</p>
              <h2 id="groups-title">Qual é a sua praia?</h2>
            </div>
            <span className="groups-heading__count">
              {String(groups.length).padStart(2, '0')} grupos
            </span>
          </div>
          <ul className="group-list">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </ul>
          <p className="groups-note">Pode entrar em mais de um. A escolha é sua.</p>
        </section>
      </main>
      <aside className="reassurance" aria-label="Como funciona">
        <span className="reassurance__label">
          <Icon name="gem" /> Menos busca. Mais achados.
        </span>
        <p>A gente encontra as ofertas. Você escolhe o que vale a pena.</p>
      </aside>
      <footer className="site-footer">
        <Brand compact />
        <p>© Garimpo Promoções</p>
        <span className="footer-tagline">Garimpamos. Você economiza.</span>
      </footer>
    </div>
  )
}
