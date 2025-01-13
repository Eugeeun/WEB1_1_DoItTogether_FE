import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Do It Together',
        short_name: 'Doto',
        description: '집안일 협동 기록 서비스, 효율적으로 집안일을 관리하세요.',
        start_url: '/',
        lang: 'ko',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        // prefer_related_applications: true,
        // related_applications: [
        //   {
        //     platform: 'play',
        //     url: 'https://play.google.com/store/apps/details?id=com.example.app',
        //   },
        // ],
        icons: [
          {
            src: '/doitto.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg}'],
      },
      devOptions: {
        enabled: false,
        type: 'module',
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
});
