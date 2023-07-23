import { resolve } from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      {
        find: "test-utils",
        replacement: resolve(__dirname, "utils/test-utils"),
      },
    ],
  },
  test: {
    coverage: {
      exclude: ["src/config/*.ts", "src/mocks/*.ts"],
      reporter: ["cobertura", "text"],
      provider: "istanbul",
    },
    globals: true,
    environment: "jsdom",
    outputFile: "./junit.xml",
    reporters: ["default", "junit"],
    setupFiles: "./src/setupTests.ts",
  },
});
