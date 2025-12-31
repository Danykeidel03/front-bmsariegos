import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'async-css',
      enforce: 'post',
      transformIndexHtml(html) {
        // Transform CSS links to load asynchronously except critical ones
        return html.replace(
          /<link\s+rel="stylesheet"\s+(crossorigin(?:="[^"]*")?\s+)?href="([^"]+)">/g,
          (match, crossorigin, href) => {
            // Keep index CSS and react-vendor as critical
            if (href.includes('index-') || href.includes('react-vendor') || href.includes('critical')) {
              return match;
            }
            // Load others asynchronously with preload
            const co = crossorigin ? crossorigin.trim() + ' ' : '';
            return `<link rel="preload" ${co}href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'" fetchpriority="low"><noscript><link rel="stylesheet" ${co}href="${href}"></noscript>`;
          }
        );
      }
    }
  ],
  build: {
    outDir: 'dist',
    cssCodeSplit: true,
    minify: 'terser',
    chunkSizeWarningLimit: 500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        reduce_vars: true,
        unused: true,
        dead_code: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        if_return: true,
        join_vars: true
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks - React ecosystem
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          
          // Router chunk
          if (id.includes('node_modules/react-router-dom')) {
            return 'router';
          }
          
          // Heavy libraries - lazy loaded
          if (id.includes('node_modules/sweetalert2')) {
            return 'sweetalert2';
          }
          
          if (id.includes('node_modules/react-image-crop')) {
            return 'react-image-crop';
          }
          
          if (id.includes('node_modules/swiper')) {
            return 'swiper';
          }
          
          // Utilities chunk
          if (id.includes('node_modules/axios')) {
            return 'axios';
          }
          
          // Pages - code split by route
          if (id.includes('/src/pages/')) {
            const page = id.split('/src/pages/')[1]?.split('/')[0];
            if (page) return `page-${page}`;
          }
          
          // Services
          if (id.includes('/src/services/')) {
            return 'services';
          }
          
          // Components - split modals separately
          if (id.includes('/src/components/') && id.includes('Modal')) {
            return 'modals';
          }
        },
        // Optimize chunk naming
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
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
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['sweetalert2', 'react-image-crop']
  }
})
