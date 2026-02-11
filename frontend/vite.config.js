import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import vitePrerender from 'vite-plugin-prerender'

const Renderer = vitePrerender.PuppeteerRenderer

// Rutas del blog para pre-renderizar
const blogSlugs = [
  'que-es-geo-generative-engine-optimization',
  'gestoria-web-pierde-clientes',
  'ia-para-pymes-guia-2025',
  'vocap-caso-estudio',
  'automatizar-reservas-restaurante',
  'cuanto-cuesta-web-2025',
  'clinica-dental-web-moderna-2025',
  'peluqueria-duplicar-reservas-automatizacion',
  'web-abogados-captar-clientes-2025',
  'automatizacion-inmobiliarias-leads',
  'digitalizacion-clinicas-veterinarias-guia',
  'sistema-reservas-gimnasios-guia',
  'talleres-mecanicos-web-comercial-2025',
  'automatizar-whatsapp-business-pymes-guia',
  'como-crear-landing-page-que-convierte-2026',
  'chatbots-ia-atencion-cliente-pymes-2026',
  'academias-formacion-web-matriculas-online-2026',
  'hoteles-rurales-web-reservas-directas-2026',
  'automatizacion-procesos-empresariales-rpa-pymes-guia',
]

const blogRoutes = blogSlugs.map((slug) => `/blog/${slug}`)

const prerenderRoutes = [
  '/',
  '/blog',
  '/demo',
  '/privacidad',
  '/terminos',
  '/cookies',
  '/guia-dominio',
  ...blogRoutes,
]

export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(import.meta.dirname, 'dist'),
      routes: prerenderRoutes,
      renderer: new Renderer({
        headless: true,
        renderAfterTime: 3000,
      }),
      postProcess(renderedRoute) {
        // Inyectar meta de pre-render para debugging
        renderedRoute.html = renderedRoute.html.replace(
          '</head>',
          '<meta name="prerender-status-code" content="200" />\n</head>'
        )
        return renderedRoute
      },
    }),
  ],
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
