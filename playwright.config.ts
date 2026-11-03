import { defineConfig, devices } from "@playwright/test";

// BASE_URL lets the same suite run against the local build or a deployed preview.
const baseURL = process.env.BASE_URL || "http://localhost:3000";

export default defineConfig({
  testDir: "tests",
  reporter: [["list"], ["json", { outputFile: "test-results/results.json" }]],
  use: { baseURL, trace: "retain-on-failure" },
  projects: [
    { name: "desktop-chrome", use: { ...devices["Desktop Chrome"] } },
    { name: "iphone-13", use: { ...devices["iPhone 13"], browserName: "chromium" } },
    { name: "pixel-7", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: "npm start", url: "http://localhost:3000", reuseExistingServer: true },
});
