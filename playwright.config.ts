import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:19006',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'cmd /c "set CI=1&& npx expo start --web --port 19006"',
    port: 19006,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
