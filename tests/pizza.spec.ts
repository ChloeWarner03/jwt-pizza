//When I want to do it with my own account 
//For each test do this
//await page.goto('http://localhost:5173/');  // ← Changed to localhost

import { test, expect } from 'playwright-test-coverage';

//Homepage test
test('home page', async ({ page }) => {
  await page.goto('https://pizza.cs329.click/');  
  
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

//


/*
  await page.getByText('JWT Pizza', { exact: true }).click();
  await page.getByText('The web\'s best pizza', { exact: true }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('Devin');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('devin@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByText('Pizza is an absolute delight').click();
  await page.getByRole('button', { name: 'Order now' }).click();
  await page.getByRole('combobox').selectOption('20');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  
  
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await page.getByRole('button', { name: 'Create store' }).click();
  await page.getByRole('textbox', { name: 'store name' }).click();
  await page.getByRole('textbox', { name: 'store name' }).fill('Hello');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('row', { name: 'Hello 0 ₿ Close' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();

}); */