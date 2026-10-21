import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://shubhamsinha1010.github.io',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // `file` keeps the old URLs alive: /work/pulsesearch.html, /404.html
  build: { format: 'file', inlineStylesheets: 'auto' },
  trailingSlash: 'ignore',
});
