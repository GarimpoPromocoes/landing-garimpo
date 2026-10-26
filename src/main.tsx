import { hydrateRoot, createRoot } from 'react-dom/client'
import App from './App'
import { startVercelAnalytics, trackEvent } from './lib/analytics'
import './styles.css'

const root = document.getElementById('root')!
if (root.childElementCount > 0) {
  hydrateRoot(root, <App />)
} else {
  createRoot(root).render(<App />)
}
startVercelAnalytics()
trackEvent({ name: 'page_view', properties: { page: '/' } })
