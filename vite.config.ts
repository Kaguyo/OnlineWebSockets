// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: 'maddison-unupbraided-abram.ngrok-free.dev',
    },
    allowedHosts: [
      'maddison-unupbraided-abram.ngrok-free.dev', // Removido 'https://'
      '.ngrok-free.dev',
    ],
    headers: {
      // CORRIGIDO: CSP definido em uma única linha para evitar o erro "Invalid character in header content"
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' ws: wss:;"
    }
  },
  build: {
    assetsInlineLimit: 0
  }
})