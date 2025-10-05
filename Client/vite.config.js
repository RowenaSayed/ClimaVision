import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  base: '/NasaSpaceApps-Challenge/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  build: {
    target: 'esnext',
    outDir: 'docs',
  },
  server: {
    port: 3000,
    open: true,

    proxy: {
      '/predict': {
        target: 'https://b583bb8c-3a38-440a-8403-716fb2dd6883-00-335ca372v7t0d.picard.replit.dev',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
