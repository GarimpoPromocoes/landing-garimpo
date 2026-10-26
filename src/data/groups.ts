export type Group = {
  /** Identificador estável, também utilizado nos eventos de analytics. */
  id: string
  name: string
  description: string
  icon: 'bag' | 'tech' | 'sparkles'
  tone: 'orange' | 'blue' | 'rose'
  /** Convite oficial https://chat.whatsapp.com/…; vazio exibe “Em breve”. */
  href: string
  /** Participantes atuais. Opcional: com o valor real, o card mostra as vagas restantes. */
  members?: number
}

export const groups: readonly Group[] = [
  {
    id: 'general',
    name: 'Garimpo Geral',
    description: 'As melhores ofertas do dia.',
    icon: 'bag',
    tone: 'orange',
    href: 'https://chat.whatsapp.com/E9FiTDLO95UBvfmKQW4sDx',
  },
  {
    id: 'tech',
    name: 'Garimpo Tech',
    description: 'Eletrônicos, acessórios e gadgets.',
    icon: 'tech',
    tone: 'blue',
    href: 'https://chat.whatsapp.com/DKYK7eWZ4GF5iMpo8ErPpa',
  },
  {
    id: 'feminine',
    name: 'Garimpo Feminino',
    description: 'Moda, beleza e autocuidado.',
    icon: 'sparkles',
    tone: 'rose',
    href: 'https://chat.whatsapp.com/G00K8tY7DsI3Jg24PATjn8',
  },
]
