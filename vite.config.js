import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'axios'],
          ui: ['@heroicons/react', 'framer-motion']
        }
      },
      external: []
    },
    assetsInlineLimit: 0
  },
  server: {
    host: true,
    port: 3000,
  },
  optimizeDeps: {
    include: ['axios', 'firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/storage']
  },
  base: '/',
  publicDir: 'public',
  esbuild: {
    // Remove automatic React injection as we'll handle imports manually
    jsxInject: null
  }
});