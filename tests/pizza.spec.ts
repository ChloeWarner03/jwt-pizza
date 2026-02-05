import { test, expect } from 'playwright-test-coverage';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByText('Order nowMost amazing pizza').click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('Devin');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('devin@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('passwrod');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('button', { name: 'Order now' }).click();
  await page.getByRole('combobox').selectOption('20');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Order more' }).click();
  await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();;
  await page.getByRole('link', { name: 'Logout' }).click();
});

