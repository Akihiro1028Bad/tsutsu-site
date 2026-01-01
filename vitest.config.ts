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
      include: [
        "app/services/mens-esthe/**/*.{ts,tsx}",
        "components/MensEstheService/**/*.{ts,tsx}",
        "lib/types/mens-esthe-service.ts",
        "lib/utils/mens-esthe-service.ts",
      ],
      exclude: [
        "**/*.d.ts",
        "**/*.config.{js,ts,mjs,cjs}",
        "**/node_modules/**",
        "**/.next/**",
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
