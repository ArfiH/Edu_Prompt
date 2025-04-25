import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [tailwindcss(), react()],
  build: {
    outDir: "dist", // Ensure the output directory is correct
    assetsDir: "assets", // Ensure assets are placed in the correct folder
  },
})
