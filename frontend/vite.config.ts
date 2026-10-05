import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Permite usar @/ como atalho para src/
      // ex: import { useAuth } from '@/context/AuthContext'
      '@': `${import.meta.dirname}/src`,
    },
  },
  server: {
    port: 5173,
    // Proxy para o backend local — evita problemas de CORS em dev
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
});

