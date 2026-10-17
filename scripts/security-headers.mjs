import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const documentHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export function securityHeadersPlugin() {
  let outputDirectory;
  return {
    name: 'sanzy-security-headers',
    configResolved(config) { outputDirectory = resolve(config.root, config.build.outDir); },
    writeBundle(_, bundle) {
      const hashes = new Set();
      for (const asset of Object.values(bundle)) {
        if (!asset.fileName.endsWith('.html') || asset.type !== 'asset') continue;
        for (const match of String(asset.source).matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
          if (!/\bsrc\s*=/.test(match[1]) && match[2].trim()) hashes.add("'sha256-" + createHash('sha256').update(match[2]).digest('base64') + "'");
        }
      }
      const policy = [
        "default-src 'self'", "base-uri 'self'", "object-src 'none'", "frame-ancestors 'none'",
        "script-src 'self' " + [...hashes].join(' ') + ' https://www.googletagmanager.com https://translate.google.com https://translate.googleapis.com',
        "script-src-attr 'none'", "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com",
        "font-src 'self' data: https://fonts.gstatic.com", "img-src 'self' data: blob: https:",
        "connect-src 'self' https://domain-price-api.prem736raj.workers.dev https://*.google-analytics.com https://www.googletagmanager.com https://translate.googleapis.com",
        "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://gumroad.com https://*.gumroad.com",
        "form-action 'self' https://gumroad.com https://*.gumroad.com",
      ].join('; ');
      const headers = { ...documentHeaders, 'Strict-Transport-Security': 'max-age=31536000', 'Content-Security-Policy': policy };
      writeFileSync(resolve(outputDirectory, '_headers'), '/*\n' + Object.entries(headers).map(([key, value]) => `  ${key}: ${value}`).join('\n') + '\n');
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = resolve(outputDirectory, '_headers');
        if (existsSync(file)) for (const match of readFileSync(file, 'utf8').matchAll(/^  ([^:]+): (.+)$/gm)) res.setHeader(match[1], match[2]);
        next();
      });
    },
  };
}
