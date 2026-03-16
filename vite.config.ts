/**
 * vite.config.ts
 * Vite configuration for artiFACT — static React/TS build targeting Cloudflare Pages.
 * Output directory: dist. No SSR, no server-side APIs.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
})
