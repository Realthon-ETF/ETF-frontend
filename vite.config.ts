import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Whenever you fetch('/api/...'), it redirects to the target below
      "/api": {
        target: "https://allyeojujob-567168557796.asia-northeast3.run.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes '/api' before sending to server
      },
    },
  },
});
