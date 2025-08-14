import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Asegúrate de que esté así para Vercel
  build: {
    outDir: 'dist',
    assetsDir: 'assets' // Carpeta donde se guardarán los recursos
}})
