import { loadEnv } from 'vite'
import { groups } from '../src/data/groups.ts'
import { isWhatsAppInvite } from '../src/lib/links.ts'
import { getSiteOrigin } from './metadata.mjs'

const errors = []
const env = loadEnv('production', process.cwd(), '')
try {
  if (!getSiteOrigin(process.env.VITE_SITE_URL || env.VITE_SITE_URL))
    errors.push('Configure VITE_SITE_URL com o domínio oficial.')
} catch (error) {
  errors.push(error.message)
}
if (!groups.length) errors.push('Adicione pelo menos um grupo.')
if (new Set(groups.map((group) => group.id)).size !== groups.length)
  errors.push('Os IDs dos grupos precisam ser únicos.')
for (const group of groups) {
  if (!isWhatsAppInvite(group.href))
    errors.push(`${group.name}: configure um convite válido em src/data/groups.ts.`)
}
if (errors.length) {
  process.stderr.write(
    `Publicação pendente:\n${errors.map((error) => `  - ${error}`).join('\n')}\n`,
  )
  process.exitCode = 1
} else {
  process.stdout.write(
    'Domínio e formatos dos convites configurados. Confirme também os convites no WhatsApp antes de publicar.\n',
  )
}
