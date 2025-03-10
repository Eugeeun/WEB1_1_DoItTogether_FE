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
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Do It Together',
        short_name: 'DOITTO',
        description: '집안일 협동 기록 서비스, 효율적으로 집안일을 관리하세요.',
        theme_color: '#ffffff',
        lang: 'ko',
        // prefer_related_applications: true,
        // related_applications: [
        //   {
        //     platform: 'play',
        //     url: 'https://play.google.com/store/apps/details?id=com.example.app',
        //   },
        // ],
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
      },
      workbox: {
        globPatterns: ['*/.{js,css,html,png,svg}'],
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
