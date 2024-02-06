import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Correctly resolve the alias for html5-qrcode
      'html5-qrcode': path.resolve(new URL('./node_modules/html5-qrcode', import.meta.url).pathname)
    }
  }
});
