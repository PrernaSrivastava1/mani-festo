import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'rhythmically-unadorned-alisa.ngrok-free.dev',
      '0a8ab964cf12.ngrok-free.app',
      '.ngrok-free.dev'
    ]
  }
})  
