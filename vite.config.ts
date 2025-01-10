import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [
        '@rollup/rollup-darwin-arm64',
        '@rollup/rollup-linux-x64-gnu'
      ]
    }
  }
})
