import { defineConfig, devices } from '@playwright/test';
import { TestConfig } from './src/config/test-config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: TestConfig.retries,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: TestConfig.timeout,
  
  use: {
    baseURL: TestConfig.baseURL,
    headless: TestConfig.headless,
    viewport: TestConfig.viewport,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium-incognito',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--incognito',
            '--disable-blink-features=AutomationControlled',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
          ]
        }
      },
    },
  ],
});