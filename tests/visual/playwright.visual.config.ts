import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: ".",
  use: { baseURL: `http://localhost:${process.env.E2E_PORT ?? 3300}`, launchOptions: process.env.CHROME ? { executablePath: process.env.CHROME } : {} },
  projects: [
    { name: "mobile-light", use: { ...devices["Pixel 7"], colorScheme: "light" } },
    { name: "desktop-dark", use: { ...devices["Desktop Chrome"], colorScheme: "dark", viewport: { width: 1280, height: 860 } } },
  ],
});
