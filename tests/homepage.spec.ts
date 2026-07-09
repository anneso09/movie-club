import { test, expect } from '@playwright/test'

test('should display movies on the homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await expect(page.getByText('Interstellar')).toBeVisible();
})