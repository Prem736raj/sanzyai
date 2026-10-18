import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { documentHeaders, securityHeadersPlugin } from './scripts/security-headers.mjs';

export default defineConfig({
  appType: 'mpa',
  plugins: [securityHeadersPlugin()],
  server: {
    host: '127.0.0.1',
    headers: documentHeaders,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  },
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'preload-helper', test: /vite[\\/]preload-helper|rolldown:runtime/, priority: 40 },
            // Keep shared helpers and DOMPurify from dragging the PDF exporter into chat.
            { name: 'sanitizer', test: /node_modules[\\/]dompurify[\\/]/, priority: 30 },
            { name: 'pdf-export', test: /node_modules[\\/]jspdf[\\/]/, priority: 20 },
          ],
        },
      },
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        '404': resolve(import.meta.dirname, '404.html'),
        affiliateDisclosure: resolve(import.meta.dirname, 'affiliate-disclosure.html'),
        aiTools: resolve(import.meta.dirname, 'ai-tools.html'),
        blog: resolve(import.meta.dirname, 'blog.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
        domainFinder: resolve(import.meta.dirname, 'domain-finder.html'),
        learnFree: resolve(import.meta.dirname, 'learn-free.html'),
        privacyPolicy: resolve(import.meta.dirname, 'privacy-policy.html'),
        promptStore: resolve(import.meta.dirname, 'prompt-store.html'),
        refundPolicy: resolve(import.meta.dirname, 'refund-policy.html'),
        submitTool: resolve(import.meta.dirname, 'submit-tool.html'),
        termsOfService: resolve(import.meta.dirname, 'terms-of-service.html'),
        blogBusiness: resolve(import.meta.dirname, 'blog/best-chatgpt-prompts-business.html'),
        blogMidjourney: resolve(import.meta.dirname, 'blog/midjourney-product-photography.html'),
        blogPromptGuide: resolve(import.meta.dirname, 'blog/how-to-write-ai-prompts.html'),
      },
    },
  },
});
