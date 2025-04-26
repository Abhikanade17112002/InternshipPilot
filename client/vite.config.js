import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    // Add this to handle CommonJS modules in test environment
    deps: {
      inline: ['redux-mock-store'],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add this to optimize dependencies
  optimizeDeps: {
    include: ['redux-mock-store'],
  },
})