// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true, 
    allowedHosts: [
      'localhost', // Mude para localhost já que não estamos usando ngrok aqui
    ],
    headers: {

      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' ws: wss:;"
    }
  },
  build: {
    assetsInlineLimit: 0
  }
})