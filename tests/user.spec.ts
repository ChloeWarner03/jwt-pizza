import { test, expect } from 'playwright-test-coverage';

const userId = 42;

test('updateUser', async ({ page }) => {
  const email = `user${Math.floor(Math.random() * 10000)}@jwt.com`;

  await page.route('**/api/auth', route => {
    const method = route.request().method();
    if (method === 'POST') {
      return route.fulfill({
        json: {
          user: { id: userId, name: 'pizza diner', email, roles: [{ role: 'diner' }] },
          token: 'test-token'
        }
      });
    }
    if (method === 'DELETE') {
      return route.fulfill({ json: { message: 'logout successful' } });
    }
    if (method === 'PUT') {
      return route.fulfill({
        json: {
          user: { id: userId, name: 'pizza diner', email, roles: [{ role: 'diner' }] },
          token: 'test-token'
        }
      });
    }
  });

  await page.route('**/api/user/me', route =>
    route.fulfill({
      json: { id: userId, name: 'pizza diner', email, roles: [{ role: 'diner' }] }
    })
  );

  await page.route(`**/api/user/${userId}`, route => {
    const method = route.request().method();
    if (method === 'PUT') {
      const body = route.request().postDataJSON();
      return route.fulfill({
        json: {
          user: { id: userId, name: body.name, email: body.email, roles: [{ role: 'diner' }] },
          token: 'updated-token'
        }
      });
    }
  });

  await page.route('**/api/order', route =>
    route.fulfill({
      json: { dinerId: userId, orders: [], page: 1 }
    })
  );

  await page.goto('/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('pizza diner');
  await page.getByRole('textbox', { name: 'Email address' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill('diner');
  await page.getByRole('button', { name: 'Register' }).click();

  await page.getByRole('link', { name: 'pd' }).click();
  await expect(page.getByRole('main')).toContainText('pizza diner');

  await page.getByRole('button', { name: 'Edit' }).click();
  await expect(page.locator('h3')).toContainText('Edit user');
  await page.getByRole('textbox').first().fill('pizza dinerx');
  await page.getByRole('button', { name: 'Update' }).click();

  await page.waitForSelector('[role="dialog"].hidden', { state: 'attached' });
  await expect(page.getByRole('main')).toContainText('pizza dinerx');
});