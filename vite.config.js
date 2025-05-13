import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/': { target: process.env.REACT_APP_API_URL, changeOrigin: true }
    }
  }
})
