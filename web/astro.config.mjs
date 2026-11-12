import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import fumadocs from '@fumadocs/astro';
import { normalizeCodeBlocks } from './src/lib/normalize-code-blocks.mjs';

export default defineConfig({
  site: 'https://qris.fixorastudio.com',
  integrations: [fumadocs({
    components: './src/components/mdx.tsx',
    hastPlugins: (plugins) => [normalizeCodeBlocks(), ...plugins],
    rehypeCodeOptions: {
      transformers: [{
        name: 'docs-code-language',
        pre(node) {
          node.properties['data-language'] = this.options.lang;
        },
      }],
    },
  })],
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
