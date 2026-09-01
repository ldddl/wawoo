import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/wawoo/',
  output: {
    publicPath: '/wawoo/'
  },
  build: {
    assetsInlineLimit: 0
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/global/tokens.scss";
        @import "@/assets/global/mixins.scss";
        @import "@/assets/global/utility.scss";
        `
      }
    }
  }
})
