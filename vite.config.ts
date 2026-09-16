import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer (apenas quando ANALYZE=true)
    process.env.ANALYZE === 'true' &&
      visualizer({
        open: true,
        filename: 'stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),

  build: {
    rollupOptions: {
      output: {
        // Estratégia de chunk splitting manual
        manualChunks: {
          // Vendor chunk - React ecosystem
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // Componentes de produto (compartilhados entre páginas)
          'components-product': [
            './src/components/product/ProductCard/ProductCard.tsx',
            './src/components/product/ProductGrid/ProductGrid.tsx',
            './src/components/product/ProductPrice/ProductPrice.tsx',
          ],

          // Image gallery (componente pesado isolado)
          'component-gallery': ['./src/components/product/ImageGallery/ImageGallery.tsx'],
        },

        // Nomenclatura de arquivos otimizada
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },

    // Limite de warning para chunks grandes
    chunkSizeWarningLimit: 1000, // 1MB

    // Minificação com Terser
    minify: 'terser',
    terserOptions: {},

    // Target moderno para bundles menores
    target: 'es2020',
  },

  // CSS code splitting automático
  css: {
    devSourcemap: true,
  },

  // Otimizar dependências
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
