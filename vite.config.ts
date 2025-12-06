// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: 'maddison-unupbraided-abram.ngrok-free.dev',
      // SOLUÇÃO: Forçar o protocolo WSS (WebSocket Secure)
      // para corresponder ao túnel HTTPS do ngrok.
      protocol: 'wss',
    },
    allowedHosts: [
      'maddison-unupbraided-abram.ngrok-free.dev',
      '.ngrok-free.dev',
    ],
    headers: {
      // ATENÇÃO: Reduz a segurança contra ataques XSS
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' ws: wss:;"
    }
  },
  build: {
    assetsInlineLimit: 0
  }
})