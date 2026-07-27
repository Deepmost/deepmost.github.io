import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
 * The site is served from a GitHub Pages project subpath
 * (deepmost.github.io/vibe/), so every asset URL needs that prefix. Change
 * REPO_NAME if the repository is renamed — the router basename and the 404
 * fallback both read this value through import.meta.env.BASE_URL.
 */
const REPO_NAME = 'vibe'

export default defineConfig(({ command }) => ({
  // Dev server runs at the root; only the built output needs the subpath.
  base: command === 'build' ? `/${REPO_NAME}/` : '/',
  plugins: [react()],
}))
