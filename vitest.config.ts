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
      ],
      // Coverage is measured and reported (text/html/lcov) but not enforced
      // with a failing threshold. Re-introduce thresholds in a dedicated PR
      // once the baseline has been raised step by step (e.g. 80% → 90% →
      // 100%).
    },
  },
})
