import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Permite acesso via rede (necessário para o sandbox)
    allowedHosts: [
      '.manusvm.computer', // Adiciona o domínio do sandbox
      'localhost',
      '127.0.0.1'
    ]
  }
})
