import { test, expect } from '@playwright/test'
 
test('should navigate to the about page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/')
  // could also be '/'
  // The page should contain at least KPop Demon Hunters' movie
  await expect(page.getByText('KPop Demon Hunters')).toBeVisible();
})