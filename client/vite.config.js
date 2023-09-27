import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 'http://localhost:8080',
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        secure: false,
      }
    }
  },
  plugins: [react()],
})
