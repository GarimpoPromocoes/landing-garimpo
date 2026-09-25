export type Group = {
  /** Identificador estável, também utilizado nos eventos de analytics. */
  id: string
  name: string
  description: string
  category: string
  icon: 'bag' | 'tech' | 'sparkles'
  tone: 'orange' | 'blue' | 'rose'
  /** Convite oficial https://chat.whatsapp.com/…; vazio exibe “Em breve”. */
  href: string
}

export const groups: readonly Group[] = [
  {
    id: 'general',
    name: 'Garimpo Geral',
    description: 'De tudo um pouco. Sempre um bom achado.',
    category: 'Um pouco de tudo',
    icon: 'bag',
    tone: 'orange',
    href: 'https://chat.whatsapp.com/E9FiTDLO95UBvfmKQW4sDx',
  },
  {
    id: 'tech',
    name: 'Garimpo Tech',
    description: 'Tecnologia, eletrônicos e seu próximo upgrade.',
    category: 'Tecnologia & eletrônicos',
    icon: 'tech',
    tone: 'blue',
    href: 'https://chat.whatsapp.com/DKYK7eWZ4GF5iMpo8ErPpa',
  },
  {
    id: 'feminine',
    name: 'Garimpo Feminino',
    description: 'Moda, beleza e cuidados para o seu dia a dia.',
    category: 'Moda, beleza & cuidado',
    icon: 'sparkles',
    tone: 'rose',
    href: 'https://chat.whatsapp.com/G00K8tY7DsI3Jg24PATjn8',
  },
]
