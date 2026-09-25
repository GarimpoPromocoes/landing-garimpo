import { createRoot } from 'react-dom/client'
import { GroupCard } from '../../src/components/GroupCard'
import { groups } from '../../src/data/groups'
import { trackEvent } from '../../src/lib/analytics'
import '../../src/styles.css'

// Convites sintéticos SOMENTE no ambiente de teste; nunca integram o build.
const fixtureGroups = groups.map((group, index) => ({
  ...group,
  href: `https://chat.whatsapp.com/TESTONLY${String(index).padStart(14, '0')}`,
}))
createRoot(document.getElementById('root')!).render(
  <main style={{ maxWidth: 560, padding: 24, margin: 'auto' }}>
    <h1>Grupos de teste</h1>
    <ul className="group-list">
      {fixtureGroups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </ul>
  </main>,
)
trackEvent({ name: 'page_view', properties: { page: '/' } })
