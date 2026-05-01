import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  appType: 'mpa',
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        '404': resolve(__dirname, '404.html'),
        affiliateDisclosure: resolve(__dirname, 'affiliate-disclosure.html'),
        affiliateProgram: resolve(__dirname, 'affiliate-program.html'),
        aiServices: resolve(__dirname, 'ai-services.html'),
        aiTools: resolve(__dirname, 'ai-tools.html'),
        blog: resolve(__dirname, 'blog.html'),
        careers: resolve(__dirname, 'careers.html'),
        chatbotDemo: resolve(__dirname, 'chatbot-demo.html'),
        contact: resolve(__dirname, 'contact.html'),
        cookiePolicy: resolve(__dirname, 'cookie-policy.html'),
        domainFinder: resolve(__dirname, 'domain-finder.html'),
        helpCenter: resolve(__dirname, 'help-center.html'),
        learnFree: resolve(__dirname, 'learn-free.html'),
        partners: resolve(__dirname, 'partners.html'),
        pressKit: resolve(__dirname, 'press-kit.html'),
        privacyPolicy: resolve(__dirname, 'privacy-policy.html'),
        promptStore: resolve(__dirname, 'prompt-store.html'),
        refundPolicy: resolve(__dirname, 'refund-policy.html'),
        status: resolve(__dirname, 'status.html'),
        submitTool: resolve(__dirname, 'submit-tool.html'),
        termsOfService: resolve(__dirname, 'terms-of-service.html'),
        affiliate: resolve(__dirname, 'affiliate.html'),
        playground: resolve(__dirname, 'playground.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        wellnessAppShowcase: resolve(__dirname, 'wellness-app-showcase.html'),
        blogBusiness: resolve(__dirname, 'blog/best-chatgpt-prompts-business.html'),
        blogMidjourney: resolve(__dirname, 'blog/midjourney-product-photography.html'),
        blogPromptGuide: resolve(__dirname, 'blog/how-to-write-ai-prompts.html'),
      },
    },
  },
});
