import { fileURLToPath, URL } from 'node:url'
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    'import.meta.env.VITE_BASE_URL': JSON.stringify(process.env.VITE_BASE_URL),
  },
  server: {
    port: process.env.VITE_PORT
  }
})
