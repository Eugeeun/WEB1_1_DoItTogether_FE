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
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/doit-together\.vercel\.app\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'doitto-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        // iOS Safari 및 인앱브라우저 대응
        disableDevLogs: true,
        sourcemap: false,
      },
      // iOS Safari 및 인앱브라우저 대응
      includeAssets: ['**/*'],
      disable: false,
      base: '/',
      minify: true,
      injectManifest: {
        injectionPoint: undefined,
      },
      selfDestroying: true, // 서비스워커 지원하지 않는 환경에서 자동 제거
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
