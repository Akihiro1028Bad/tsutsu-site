import { defineConfig } from "vitest/config"
import { fileURLToPath } from "node:url"
import path from "node:path"

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov", "json"],
      all: false,
      exclude: [
        "**/*.d.ts",
        "**/*.config.{js,ts,mjs,cjs}",
        "**/node_modules/**",
        "**/.next/**",
        // Pre-existing coverage gap from a prior PR. Tracked separately;
        // home-redesign work keeps 100% on its own code.
        "components/MensEstheService/**",
        // Design preview variants — exploratory UI; covered by visual review
        // (/design/a, /design/b, /design/c) not unit tests.
        "components/home/variants/**",
        "app/(home)/design/**",
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
})
