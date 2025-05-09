import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"], // Use ESM format
  target: "node16", // Ensure compatibility with Node.js 16+
});