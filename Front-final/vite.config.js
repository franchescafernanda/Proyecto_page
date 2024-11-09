import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: process.env.PORT || 10000,  // Render espera que sea 10000
    host: '0.0.0.0',  // Esto asegura que la aplicación sea accesible desde el exterior
  },
});
