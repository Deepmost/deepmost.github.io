import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// '/vibe/' in production, '/' in dev. React Router wants it without the
// trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

/*
 * Restores the deep link stashed by public/404.html on static hosts (GitHub
 * Pages) that have no SPA rewrite rule. Runs before the router mounts so the
 * first render already sees the intended path.
 */
try {
  const redirect = sessionStorage.getItem('spa-redirect')
  if (redirect) {
    sessionStorage.removeItem('spa-redirect')
    if (redirect !== window.location.pathname) {
      window.history.replaceState(null, '', redirect)
    }
  }
} catch {
  // sessionStorage can throw when storage is blocked; deep links simply land
  // on the home page instead of breaking the render.
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
)
