/// <reference types="vitest" />
/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    //setupFiles: "./setupTests.ts",
    //mockReset: false,
    //include: ["src", "test/vitest.setup.ts"],
  },
});
