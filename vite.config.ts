import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' faz o app funcionar em qualquer endereço; as rotas usam #hash (não precisam de reescrita no servidor).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: true },
});
