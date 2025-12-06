import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // ADD THE 'server' BLOCK BELOW
  server: {
    // 1. Host for Hot Module Replacement (HMR)
    // This tells Vite how to send code updates over the ngrok tunnel.
    // Replace the URL with your specific ngrok-provided domain.
    hmr: {
        host: 'maddison-unupbraided-abram.ngrok-free.dev',
    },
    
    // 2. Allowed Hosts (Resolves the "Blocked request" error)
    // This explicitly permits Vite to serve your app when accessed
    // via the external ngrok domain.
    allowedHosts: [
        'maddison-unupbraided-abram.ngrok-free.dev', 
        '.ngrok-free.dev', // Recommended: allows all ngrok free subdomains
    ],
  },
});