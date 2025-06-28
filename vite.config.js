import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    cors: true
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',    // deine Hauptseite
        editor: 'editor.html'    // zweite Seite
      }
    }
  }
})
