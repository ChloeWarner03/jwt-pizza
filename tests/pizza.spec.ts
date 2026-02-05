import { test, expect } from 'playwright-test-coverage';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test('login', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => {
      const loginReq = { email: 'devin@gmail.com', password: 'password' };
      const loginRes = {
        user: { id: 1, name: 'Devin', email: 'devin@gmail.com', roles: [{ role: 'diner'}] },
      }
      token: 'fake-login',
  },
    
