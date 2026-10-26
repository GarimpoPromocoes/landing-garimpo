import type { Promo } from '../data/promos'
import { discountPercent, formatBRL } from '../lib/money'
import { Icon } from './Icon'

/** Celular com uma oferta real, como ela chega no grupo. Leitores de tela recebem o resumo em aria-label. */
function PhoneMockup({ promo }: { promo: Promo }) {
  const discount = discountPercent(promo.from, promo.price)
  const label = `Exemplo de mensagem do grupo: ${promo.name}, de ${formatBRL(promo.from)} por ${formatBRL(promo.price)}, ${discount}% de desconto${promo.coupon ? `, cupom ${promo.coupon}` : ''}.`
  return (
    <div className="phone-stage" role="img" aria-label={label}>
      <div className="phone">
        <div className="phone__status">
          <span>15:33</span>
          <span className="phone__signal">
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="phone__chat-header">
          <img className="phone__avatar" src="/art/avatar.webp" alt="" width="160" height="160" />
          <span className="phone__chat-title">
            <strong>Garimpo Promoções</strong>
            <span>grupo de ofertas</span>
          </span>
          <Icon name="phone" className="phone__call" />
        </div>
        <div className="phone__chat">
          <div className="message">
            <div className="message__media">
              <img src={promo.image} alt="" width="236" height="208" loading="lazy" />
              <span className="discount">-{discount}%</span>
            </div>
            <p className="message__name">{promo.name}</p>
            <p className="message__prices">
              <strong>{formatBRL(promo.price)}</strong>
              <s>{formatBRL(promo.from)}</s>
            </p>
            <p className="message__note">
              🔥 {promo.coupon ? `Cupom ${promo.coupon}` : 'Achado do dia!'}
            </p>
            <span className="message__time">15:33</span>
          </div>
        </div>
      </div>
      <span className="phone-stage__whatsapp">
        <Icon name="whatsapp" />
      </span>
      <Icon name="send" className="phone-stage__send" />
    </div>
  )
}

export function Showcase({ promos }: { promos: readonly Promo[] }) {
  return (
    <section className="showcase" aria-labelledby="showcase-title">
      <div className="showcase__text">
        <h2 className="section-title" id="showcase-title">
          O que te espera <span className="text-gold">lá dentro</span>
        </h2>
        <p className="section-lead">Preço bom, print real, link direto e aviso rápido.</p>
      </div>
      <PhoneMockup promo={promos[0]} />
      <div className="showcase__proof">
        <figure className="testimonial">
          <img src="/art/achados.webp" alt="" width="628" height="264" loading="lazy" />
          <figcaption className="testimonial__bubble">
            Achados como esse todos os dias no grupo! <span aria-hidden="true">🔥</span>
          </figcaption>
        </figure>
      </div>
      <p className="showcase__note">
        Oferta já enviada nos grupos. Preços e cupons mudam rápido.
      </p>
    </section>
  )
}
