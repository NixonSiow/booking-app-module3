import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths in production
  build: {
    outDir: 'dist', // Explicitly set the output directory
  },
});
