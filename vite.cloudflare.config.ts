import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Cloudflare Pages 使用标准的 Vite 单目录静态产物，不启用妙搭 CDN 分层插件。
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  define: {
    'import.meta.env.MIAODA_CLIENT_BASE_PATH': JSON.stringify('/'),
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist/cloudflare',
    emptyOutDir: true,
  },
});
