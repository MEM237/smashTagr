import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    fs: {
      strict: true
    },
    middlewareMode: false,
    watch: {
      ignored: ['**/shadow_list.json']
    },
    proxy: {
      '/api': 'http://localhost:5000'
    },
    setupMiddlewares(middlewares, devServer) {
      middlewares.push((req, res, next) => {
        if (req.url && req.url.includes('/api/spoof')) {
          console.log(`🔒 Spoof trap activated. Reflex alerted.`)
        }
        next()
      })
      return middlewares
    }
  }
})
