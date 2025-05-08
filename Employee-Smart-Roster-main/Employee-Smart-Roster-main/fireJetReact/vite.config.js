import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    sourcemap: true,
    host: true,
    // port: 5173,
  },
  build: {
    sourcemap: false, // Ensure source maps are generated
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'moment'] // Explicitly include these deps
  },
});
