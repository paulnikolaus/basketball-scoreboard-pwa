import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Reducer tests need no browser or React rendering.
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
