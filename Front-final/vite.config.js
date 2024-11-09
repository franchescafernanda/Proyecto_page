
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: process.env.PORT || 4173, // Usa el puerto proporcionado por Render o 4173 por defecto
    host: true, // Permite que la app sea accesible desde fuera de localhost
  },
});
