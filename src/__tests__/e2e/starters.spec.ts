import { test, expect } from '@playwright/test';

test('should display welcome text on home page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3001/');

  // The home page should contain a div with "Welcome"
  await expect(page.locator('text=Welcome')).toBeVisible();
});
