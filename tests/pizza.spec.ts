import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
  await page.goto('https://pizza.cs329.click/');  
  
  // Verify home page elements
  await expect(page.getByText('JWT Pizza', { exact: true })).toBeVisible();
  await expect(page.getByText('The web\'s best pizza', { exact: true })).toBeVisible();
});

test('register new user and order pizza', async ({ page }) => {
  await page.goto('https://pizza.cs329.click/');
  
  // Navigate to register
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  
  // Register new user
  await page.getByRole('textbox', { name: 'Full name' }).fill('Devin');
  await page.getByRole('textbox', { name: 'Email address' }).fill('devin@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Register' }).click();
  
  // Verify registration success
  await expect(page.getByText('Pizza is an absolute delight')).toBeVisible();
  
  // Order pizza
  await page.getByRole('button', { name: 'Order now' }).click();
  await page.getByRole('combobox').selectOption('20');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Pay now' }).click();
  
  // Logout
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});

test('franchisee manages store', async ({ page }) => {
  await page.goto('https://pizza.cs329.click/');
  
  // Login as franchisee
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Navigate to franchise
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  
  // Create store
  await page.getByRole('button', { name: 'Create store' }).click();
  await page.getByRole('textbox', { name: 'store name' }).fill('Hello');
  await page.getByRole('button', { name: 'Create' }).click();
  
  // Verify store created
  await expect(page.getByRole('row', { name: 'Hello 0 ₿ Close' })).toBeVisible();
  
  // Close store
  await page.getByRole('row', { name: 'Hello 0 ₿ Close' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Close' }).click();
  
  // Logout
  await page.getByRole('link', { name: 'Logout' }).click();
});