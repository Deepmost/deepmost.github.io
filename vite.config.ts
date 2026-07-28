import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
 * This is the account-level GitHub Pages site (deepmost.github.io), so assets
 * and client-side routes are served directly from the domain root.
 */
export default defineConfig({
  base: '/',
  plugins: [react()],
})
