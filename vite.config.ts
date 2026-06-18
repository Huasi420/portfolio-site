import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Trigger rebuild after GitHub Pages source configuration
export default defineConfig({
  plugins: [react()],
})
