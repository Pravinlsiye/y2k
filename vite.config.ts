import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  // Hardcoded to root for custom domain
  base: '/',
})
