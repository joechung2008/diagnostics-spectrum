import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@adobe/react-spectrum-workflow")) {
            return "react-spectrum-workflow";
          } else if (id.includes("@adobe/react-spectrum-ui")) {
            return "react-spectrum-ui";
          } else if (id.includes("@adobe/react-spectrum")) {
            return "react-spectrum";
          } else {
            return null;
          }
        },
      },
    },
  },
  plugins: [react()],
  test: {
    coverage: {
      exclude: ["src/**/*.d.ts", "src/__tests__"],
      include: ["src/**/*.{ts,tsx}"],
      provider: "v8",
    },
    deps: {
      web: {
        transformCss: true,
      },
    },
    environment: "jsdom",
    globals: true,
    pool: "vmThreads",
    setupFiles: "./setupTests.ts",
  },
});
