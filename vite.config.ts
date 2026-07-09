import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@lib': resolve(__dirname, './src/lib'),
      '@pages': resolve(__dirname, './src/pages'),
      '@assets': resolve(__dirname, './src/assets'),
      '@data': resolve(__dirname, './src/data'),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        // Chunk splitting for performance
        manualChunks: {
          'react-vendor':  ['react', 'react-dom', 'react-router-dom'],
          'three-vendor':  ['three', '@react-three/fiber', '@react-three/drei'],
          'motion-vendor': ['framer-motion', 'gsap', '@gsap/react'],
        },
      },
    },
  },
})
