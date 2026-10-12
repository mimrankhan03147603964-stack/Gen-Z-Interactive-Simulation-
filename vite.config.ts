import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'save-hero-banner-image',
        configureServer(server) {
          server.middlewares.use('/api/save-banner-bg', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body);
                  if (data.image) {
                    const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '');
                    const buffer = Buffer.from(base64Data, 'base64');
                    
                    const publicPath = path.resolve(import.meta.dirname, 'public/hero-banner-bg.jpg');
                    fs.writeFileSync(publicPath, buffer);
                    
                    const distDir = path.resolve(import.meta.dirname, 'dist');
                    if (fs.existsSync(distDir)) {
                      fs.writeFileSync(path.resolve(distDir, 'hero-banner-bg.jpg'), buffer);
                    }
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, url: '/hero-banner-bg.jpg' }));
                    return;
                  }
                } catch (err) {
                  console.error('Error saving banner bg:', err);
                }
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid data' }));
              });
            } else if (req.method === 'GET') {
              const publicPath = path.resolve(import.meta.dirname, 'public/hero-banner-bg.jpg');
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ exists: fs.existsSync(publicPath) }));
            } else {
              res.writeHead(405, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Method not allowed' }));
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
