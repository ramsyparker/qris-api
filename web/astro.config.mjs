import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://qr.ireng.uk',
  integrations: [
    react(),
    starlight({
      title: 'QRIS API',
      description: 'Panduan integrasi QRIS API.',
      locales: {
        root: { label: 'Indonesia', lang: 'id' },
      },
      sidebar: [
        {
          label: 'Dokumentasi',
          items: [
            { label: 'Mulai', slug: 'docs' },
          ],
        },
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/convert': 'http://localhost:3000',
        '/decode': 'http://localhost:3000',
        '/qr': 'http://localhost:3000',
        '/api-reference': 'http://localhost:3000',
      },
    },
  },
});
