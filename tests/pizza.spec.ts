//When I want to do it with my own account 
//For each test do this
//await page.goto('http://localhost:5173/');  // ← Changed to localhost

import { test, expect } from 'playwright-test-coverage';

//Homepage test
test('home page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
});

test('register new user and order pizza', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
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
  await page.getByRole('combobox').selectOption({ label: 'SLC' });
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Pay now' }).click();
  
  // Logout
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});

// Franchisee tests
test('login as franchisee', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await expect(page.getByRole('link', { name: 'PF' })).toBeVisible();
});

test('view franchisee dashboard', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Login as franchisee
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Navigate to franchise
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
});

test('franchisee can view close store dialog', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  
  // Click close on a store
  await page.getByRole('button', { name: 'Close' }).first().click();
  
  await expect(page.getByText('Sorry to see you go')).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();
});

test('franchisee can view create store dialog', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await page.getByRole('button', { name: 'Create store' }).click();
  
  await expect(page.getByPlaceholder('store name')).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();
});

// Admin tests
test('login as admin', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
});

test('view admin dashboard', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Login as admin
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Navigate to admin page
  await page.getByRole('link', { name: 'Admin' }).click();
  
  await expect(page.getByText('Mama Ricci\'s kitchen')).toBeVisible();
});

test('admin can view create franchise dialog', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  
  await expect(page.getByPlaceholder('franchise name')).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();
});

test('admin can view close franchise dialog', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByRole('link', { name: 'Admin' }).click();
  
  // Click close button on first franchise
  await page.getByRole('button', { name: 'close' }).first().click();
  
  await expect(page.getByText('Sorry to see you go')).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();
});


test('view diner dashboard', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Login
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('d@jwt.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Click on user name to view dashboard
  await page.getByRole('link', { name: 'pd' }).click();
  
  await expect(page.getByText('Your pizza kitchen')).toBeVisible();
});

//view pages

test('view about page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByText('The secret sauce')).toBeVisible();
});

test('view history page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByText('Mama Rucci')).toBeVisible();
});

test('view docs page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'About' }).click();
  await page.getByText('The secret sauce').click();
  await page.getByText('At JWT Pizza, our amazing').click();
  await page.getByText('Our talented employees at JWT').click();
  await page.getByRole('heading', { name: 'Our employees' }).click();
  await page.getByRole('link', { name: 'home' }).click();

})

test('view 404 page', async ({ page }) => {
  await page.goto('http://localhost:5173/non-existent-page');
  await expect(page.getByText('Oops')).toBeVisible();
});


// Error handling tests
test('failed login shows error', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('invalid@test.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Should stay on login page or show error
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
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