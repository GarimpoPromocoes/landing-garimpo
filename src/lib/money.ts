const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatBRL(value: number): string {
  return brl.format(value)
}

/** Desconto inteiro entre o preço anterior e o atual. */
export function discountPercent(from: number, price: number): number {
  return Math.round((1 - price / from) * 100)
}
