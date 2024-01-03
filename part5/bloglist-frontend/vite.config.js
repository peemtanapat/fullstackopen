import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export const VITE_PORT = 5179

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: VITE_PORT,
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
    },
  },
})
