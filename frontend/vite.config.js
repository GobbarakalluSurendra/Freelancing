import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['humorous-moonbeam-footboard.ngrok-free.dev', '.ngrok-free.dev', '.ngrok-free.app'],  // Allow ngrok hosts
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
