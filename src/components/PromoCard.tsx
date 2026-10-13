import type { Promo } from '../data/promos'
import { discountPercent, formatBRL } from '../lib/money'

export function PromoCard({ promo, groupName }: { promo: Promo; groupName: string }) {
  return (
    <li className="promo-card">
      <img
        className="promo-card__image"
        src={promo.image}
        alt=""
        width="236"
        height="208"
        loading="lazy"
        decoding="async"
      />
      <div className="promo-card__body">
        <h3 className="promo-card__name">{promo.name}</h3>
        <p className="promo-card__price-row">
          <span className="promo-card__price">
            <span className="sr-only">Por </span>
            {formatBRL(promo.price)}
          </span>
          <span className="promo-card__discount">-{discountPercent(promo.from, promo.price)}%</span>
        </p>
        <p className="promo-card__from">
          De <s>{formatBRL(promo.from)}</s>
        </p>
        {promo.coupon && (
          <p className="promo-card__coupon">
            Cupom <code>{promo.coupon}</code>
          </p>
        )}
      </div>
      <p className="promo-card__footer">
        <span className="promo-card__saving">Economize {formatBRL(promo.from - promo.price)}</span>
        <span className="promo-card__source">{groupName}</span>
      </p>
    </li>
  )
}
