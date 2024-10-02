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

  test('Dropdown List', async ({ page }) => {
    await page.goto('/dropdown');

    const dropdown = page.locator('#dropdown');

    // Select options by value (if available) or text content
    await dropdown.selectOption({ value: '1' }); // Or { label: 'Option 1' }
    await expect(dropdown).toHaveValue('1'); 

    await dropdown.selectOption({ value: '2' }); // Or { label: 'Option 2' }
    await expect(dropdown).toHaveValue('2'); 
  });

  test('Dynamic Loading - Example 1: Element on page that is hidden', async ({ page }) => {
    await page.goto('/dynamic_loading/1');
  
    await expect(page.getByRole('heading', { name: 'Example 1: Element on page that is hidden' })).toBeVisible();
  
    const button = await page.getByRole('button', { name: 'Start' });
    await button.click();
  
    await page.waitForSelector('h4:has-text("Hello World!")', { state: 'visible' }); 
    await page.getByRole('heading', { name: 'Hello World!', level: 4 }).click(); 
  });

  test('Dynamic Loading - Example 2: Element rendered after the fact', async ({ page }) => {
    await page.goto('/dynamic_loading/2');
  
    await expect(page.getByRole('heading', { name: 'Example 2: Element rendered after the fact' })).toBeVisible();
  
    const button = await page.getByRole('button', { name: 'Start' });
    await button.click();
  
    await page.waitForSelector('h4:has-text("Hello World!")', { state: 'attached' }); 
  
    await page.getByRole('heading', { name: 'Hello World!', level: 4 }).click(); 
  });

});