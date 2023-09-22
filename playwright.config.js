module.exports = {
  projects: [
    {
      name: 'Chromium',
      testMatch: '**/*.spec.ts',
      use: {
        browserName: 'chromium',
        // Add any other Playwright configuration options here
      },
    },
    {
      name: 'Firefox',
      testMatch: '**/*.spec.ts',
      use: {
        browserName: 'firefox',
        // Add any other Playwright configuration options here
      },
    },
    {
      name: 'WebKit',
      testMatch: '**/*.spec.ts',
      use: {
        browserName: 'webkit',
        // Add any other Playwright configuration options here
      },
    },
  ],
};
