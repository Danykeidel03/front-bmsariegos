import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    cssCodeSplit: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2
      },
      mangle: {
        safari10: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  base: '/',
  server: {
    hmr: {
      overlay: false
    },
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
})
