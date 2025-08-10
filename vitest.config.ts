/// <reference types="vitest" />
import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
      css: true,
      coverage: {
        reporter: ["text", "json", "html"],
        exclude: [
          "node_modules/",
          "src/test/setup.ts",
          "**/*.d.ts",
          "**/*.test.{js,jsx,ts,tsx}",
          "**/*.stories.{js,jsx,ts,tsx}",
        ],
      },
      include: ["src/**/*.test.{js,jsx,ts,tsx}"],
      exclude: ["**/node_modules/**", "**/dist/**"],
    },
  }),
);
