import type { Group } from './groups'

export type Promo = {
  /** Identificador estável e único. */
  id: string
  /** Nome curto, para caber em duas linhas no celular. */
  name: string
  /** Arquivo em public/promos/. */
  image: string
  /** Preço anterior e preço da oferta, em reais. */
  from: number
  price: number
  /** Cupom exibido ao lado do preço, quando a oferta depende dele. */
  coupon?: string
  /** Grupo em que a oferta foi enviada. */
  groupId: Group['id']
}

/** Exemplos de ofertas já enviadas nos grupos; a seção deixa claro que preços mudam. */
export const promos: readonly Promo[] = [
  {
    id: 'tenis-democrata-block',
    name: 'Tênis Democrata Block Masculino',
    image: '/promos/tenis-democrata-block.jpg',
    from: 329.99,
    price: 205.99,
    groupId: 'general',
  },
  {
    id: 'samsung-odyssey-g40',
    name: 'Samsung Odyssey G40 27" 240Hz 1ms',
    image: '/promos/samsung-odyssey-g40.jpg',
    from: 1819,
    price: 1106.1,
    coupon: 'PROMODEHOJE',
    groupId: 'tech',
  },
]
