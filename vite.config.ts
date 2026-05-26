import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  // VITE_BASE is injected by the GH Actions workflow as /repo-name/.
  // Falls back to '/' for local dev.
  base: process.env.VITE_BASE ?? '/',
})
