import { Icon, type IconName } from './Icon'

const reasons: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'tag',
    title: 'Descontos reais',
    text: 'Ofertas de verdade, com cupons e preços baixos.',
  },
  { icon: 'bolt', title: 'Sem enrolação', text: 'Só o que realmente vale a pena.' },
  {
    icon: 'users',
    title: 'Grupos ativos',
    text: 'Novas ofertas todos os dias, direto no seu WhatsApp.',
  },
]

export function Reasons() {
  return (
    <section className="reasons" aria-labelledby="reasons-title">
      <h2 className="section-title" id="reasons-title">
        Por que <span className="text-gold">entrar?</span>
      </h2>
      <ul className="reason-list">
        {reasons.map((reason) => (
          <li className="reason" key={reason.title}>
            <Icon name={reason.icon} className="reason__icon" />
            <span>
              <strong className="reason__title">{reason.title}</strong>
              <span className="reason__text">{reason.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
