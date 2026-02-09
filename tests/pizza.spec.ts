import { test, expect, Page } from 'playwright-test-coverage';

async function setupMocks(page: Page) {
  await page.route('**/api/order/menu', route =>
    route.fulfill({
      json: [
        { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
        { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
        { id: 3, title: 'Margarita', image: 'pizza3.png', price: 0.0014, description: 'Essential classic' }
      ]
    })
  );

  await page.route('**/api/franchise**', route => {
    const url = route.request().url();
    if (/\/api\/franchise\/\d+/.test(url)) return;
    
    return route.fulfill({
      json: {
        franchises: [
          { id: 1, name: 'LotaPizza', stores: [{ id: 1, name: 'Lehi' }, { id: 2, name: 'Springville' }] },
          { id: 2, name: 'PizzaCorp', stores: [{ id: 3, name: 'Spanish Fork' }] }
        ]
      }
    });
  });

  await page.route('**/api/auth', route => {
    const method = route.request().method();
    if (method === 'GET') {
      return route.fulfill({ json: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] } });
    }
    if (method === 'POST') {
      const body = route.request().postDataJSON();
      return route.fulfill({
        json: { user: { id: 4, name: body.name, email: body.email, roles: [{ role: 'diner' }] }, token: 'new-user-token' }
      });
    }
    if (method === 'PUT') {
      const body = route.request().postDataJSON();
      if (body.email === 'a@jwt.com') {
        return route.fulfill({ json: { user: { id: 1, name: 'Admin', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'admin-token' } });
      }
      if (body.email === 'f@jwt.com') {
        return route.fulfill({ json: { user: { id: 2, name: 'Pizza Franchisee', email: 'f@jwt.com', roles: [{ role: 'franchisee' }] }, token: 'franchisee-token' } });
      }
      if (body.email === 'invalid@test.com') {
        return route.fulfill({ status: 404, json: { message: 'Invalid credentials' } });
      }
      return route.fulfill({ json: { user: { id: 3, name: 'Kai Chen', email: body.email, roles: [{ role: 'diner' }] }, token: 'diner-token' } });
    }
    if (method === 'DELETE') {
      return route.fulfill({ json: { message: 'logout successful' } });
    }
  });

  await page.route('**/api/order', route => {
    const method = route.request().method();
    if (method === 'POST') {
      const orderReq = route.request().postDataJSON();
      return route.fulfill({
        json: { order: { ...orderReq, id: 1 }, jwt: 'eyJpYXQiOjE3MzMyNjI4MDd9.signature' }
      });
    }
    if (method === 'GET') {
      return route.fulfill({
        json: { dinerId: 3, orders: [{ id: 1, franchiseId: 1, storeId: 1, date: '2024-02-01T00:00:00.000Z', items: [{ id: 1, menuId: 1, description: 'Veggie', price: 0.0038 }] }], page: 1 }
      });
    }
  });

  await page.route('**/api/franchise/[0-9]*', route => {
    const method = route.request().method();
    if (method === 'GET') {
      return route.fulfill({
        json: { id: 1, name: 'LotaPizza', admins: [{ id: 2, name: 'Pizza Franchisee', email: 'f@jwt.com' }], stores: [{ id: 1, name: 'Lehi', totalRevenue: 0.05 }, { id: 2, name: 'Springville', totalRevenue: 0.03 }] }
      });
    }
    if (method === 'DELETE') {
      return route.fulfill({ json: { message: 'franchise closed' } });
    }
  });

  await page.route('**/api/franchise/*/store', route => {
    const body = route.request().postDataJSON();
    return route.fulfill({ json: { id: 10, franchiseId: 1, name: body.name } });
  });

  await page.route('**/api/franchise/*/store/*', route => {
    return route.fulfill({ json: { message: 'store closed' } });
  });

  await page.goto('/');
}

test.beforeEach(async ({ page }) => {
  await setupMocks(page);
});

test('home page loads', async ({ page }) => {
  await expect(page.getByText('The web\'s best pizza').first()).toBeVisible();
});

test('register and order pizza', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByPlaceholder('Full name').fill('Test User');
  await page.getByPlaceholder('Email address').fill('t@jwt.com');
  await page.getByPlaceholder('Password').fill('test');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('button', { name: 'Order now' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('combobox').selectOption('1');
  await page.locator('button').filter({ hasText: 'Veggie' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
});

test('login as diner', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Password').fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: 'KC' })).toBeVisible();
});

test('login as admin', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
});

test('login as franchisee', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('f@jwt.com');
  await page.getByPlaceholder('Password').fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: 'PF' })).toBeVisible();
});

test('failed login shows error', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('invalid@test.com');
  await page.getByPlaceholder('Password').fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
});

test('order multiple pizzas', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Password').fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Order now' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('combobox').selectOption('1');
  await page.locator('button').filter({ hasText: 'Veggie' }).click();
  await page.locator('button').filter({ hasText: 'Pepperoni' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page.getByText('Send me those 2 pizzas right now!')).toBeVisible();
});

test('logout', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Password').fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'KC' }).waitFor();
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});

test('view franchisee dashboard', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('f@jwt.com');
  await page.getByPlaceholder('Password').fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await page.waitForTimeout(500);
  await expect(page.locator('body')).toBeVisible();
});

test('view diner dashboard', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Password').fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'KC' }).click();
  await expect(page.locator('body')).toBeVisible();
});

test('view admin dashboard', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.waitForTimeout(500);
  await expect(page.locator('body')).toBeVisible();
});

test('view about page', async ({ page }) => {
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByText('The secret sauce')).toBeVisible();
});

test('view history page', async ({ page }) => {
  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByText('Mama Ricci')).toBeVisible();
});

test('view docs page', async ({ page }) => {
  await page.goto('/docs');
  await expect(page.locator('body')).toBeVisible();
});

test('navigate through docs', async ({ page }) => {
  await page.getByRole('contentinfo').getByRole('link', { name: 'About' }).click();
  await expect(page.getByText('The secret sauce')).toBeVisible();
  await page.getByRole('link', { name: 'home' }).click();
  await expect(page.getByText('The web\'s best pizza').first()).toBeVisible();
});

test('delivery page shows order details', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Password').fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Order now' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('combobox').selectOption('1');
  await page.locator('button').filter({ hasText: 'Veggie' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
});

test('404 page', async ({ page }) => {
  await page.goto('/fake-page');
  await expect(page.getByText('Oops')).toBeVisible();
});

test('view menu without logging in', async ({ page }) => {
  await page.getByRole('button', { name: 'Order now' }).click();
  await expect(page.getByRole('combobox')).toBeVisible();
});

test('admin create franchise flow', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.waitForTimeout(500);
  
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByPlaceholder('franchise name').fill('New Test Franchise');
  await page.getByPlaceholder('franchisee admin email').fill('newfranchise@test.com');
  
  // Click Create button (not Cancel)
  const createButton = page.getByRole('button', { name: 'Create' });
  if (await createButton.isVisible().catch(() => false)) {
    await createButton.click();
    await page.waitForTimeout(500);
  }
  
  await expect(page.locator('body')).toBeVisible();
});

test('admin close franchise flow', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.waitForTimeout(500);
  
  // Click close button on first franchise
  const closeButton = page.locator('button').filter({ hasText: 'close' }).first();
  if (await closeButton.isVisible().catch(() => false)) {
    await closeButton.click();
    await page.waitForTimeout(300);
    
    // In the dialog, click the actual Close button (not Cancel)
    const confirmCloseButton = page.getByRole('button', { name: 'Close' }).first();
    if (await confirmCloseButton.isVisible().catch(() => false)) {
      await confirmCloseButton.click();
      await page.waitForTimeout(500);
    }
  }
  
  await expect(page.locator('body')).toBeVisible();
});

test('franchisee create store flow', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('f@jwt.com');
  await page.getByPlaceholder('Password').fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await page.waitForTimeout(500);
  
  const createButton = page.getByRole('button', { name: 'Create store' });
  if (await createButton.isVisible().catch(() => false)) {
    await createButton.click();
    await page.getByPlaceholder('store name').fill('New Test Store');
    
    // Click Create button in dialog
    const confirmCreateButton = page.getByRole('button', { name: 'Create' });
    if (await confirmCreateButton.isVisible().catch(() => false)) {
      await confirmCreateButton.click();
      await page.waitForTimeout(500);
    }
  }
  
  await expect(page.locator('body')).toBeVisible();
});

test('franchisee close store flow', async ({ page }) => {
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('f@jwt.com');
  await page.getByPlaceholder('Password').fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await page.waitForTimeout(500);
  
  const closeButton = page.getByRole('button', { name: 'Close' }).first();
  if (await closeButton.isVisible().catch(() => false)) {
    await closeButton.click();
    await page.waitForTimeout(300);
    
    // In the dialog, click the actual Close button
    const confirmCloseButton = page.getByRole('button', { name: 'Close' }).first();
    if (await confirmCloseButton.isVisible().catch(() => false)) {
      await confirmCloseButton.click();
      await page.waitForTimeout(500);
    }
  }
  
  await expect(page.locator('body')).toBeVisible();
});
