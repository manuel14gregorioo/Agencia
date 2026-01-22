import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Optimizaciones de build (esbuild viene incluido con Vite)
    minify: 'esbuild',
    // Code splitting manual para mejor caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk para React (raramente cambia)
          'vendor-react': ['react', 'react-dom'],
          // Iconos en chunk separado
          'vendor-icons': ['lucide-react'],
        },
        // Nombres de archivo con hash para cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Tamaño máximo de chunk antes de warning
    chunkSizeWarningLimit: 500,
  },
  // Optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
})
