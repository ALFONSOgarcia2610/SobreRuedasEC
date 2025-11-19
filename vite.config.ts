import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port:
        mode === 'development'
          ? Number(process.env.VITE_PORT_DEV)
          : Number(process.env.VITE_PORT_PROD),
      host: true,
    },
    preview: {
      port: 4173,
      host: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      target: 'es2015',   // ← Safari iOS 12+ compatible
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['@tanstack/react-router'],
          },
        },
      },
    },

  });
};
