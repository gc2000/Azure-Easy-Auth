import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Mock the auth endpoints locally if needed, or just let them 404
      '/.auth': {
        target: 'http://localhost:3000', 
        bypass: (req) => {
          // In dev, these won't work without a mock, but this prevents proxy errors
          if (req.url?.includes('/.auth/me')) {
            return req.url;
          }
        }
      }
    }
  }
})