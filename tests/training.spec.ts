import { test, expect } from '@playwright/test';

test.describe('The Internet Herokuapp', () => { 
  test('Homepage Title', async ({ page }) => {
    await page.goto('/'); // Using baseURL from playwright.config.js
    await expect(page).toHaveTitle(/The Internet/);
  });

  test('Checkboxes', async ({ page }) => {
    await page.goto('/checkboxes'); // Using baseURL

    // More descriptive variable names
    const firstCheckbox = page.getByRole('checkbox').first();
    const secondCheckbox = page.getByRole('checkbox').nth(1); 

    // Assert initial state
    await expect(firstCheckbox).not.toBeChecked();
    await expect(secondCheckbox).toBeChecked();

    // Interact with checkboxes
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();

    await secondCheckbox.uncheck();
    await expect(secondCheckbox).not.toBeChecked();
  });
});