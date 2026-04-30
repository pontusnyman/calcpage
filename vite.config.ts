import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** Loads extracted CSS without render-blocking; matches Tailwind bg-gray-50 shell in index.html. */
function nonBlockingCss(): Plugin {
  return {
    name: 'non-blocking-css',
    enforce: 'post',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
        (_m, href: string) =>
          `<link rel="preload" href="${href}" as="style" crossorigin onload="this.onload=null;this.rel='stylesheet'">` +
          `<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`,
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nonBlockingCss()],
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
