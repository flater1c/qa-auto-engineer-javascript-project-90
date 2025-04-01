import { expect } from '@playwright/test';
import { test } from './utils/fixtures.js';
import { LoginPage } from './pages/loginPage.js';
import { LayoutPage } from './pages/layoutPage.js';

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('Rendering successfully', async ({ page }) => {
  await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
});

test('login', async ({ page, testData }) => {
  await loginPage.login(testData.users.admin.username, testData.users.admin.password);
  await expect(page.getByText(/Welcome to the administration/i)).toBeVisible();
});

test('logout', async ({ page, testData }) => {
  const loginPage = new LoginPage(page);
  const layoutPage = new LayoutPage(page);
  await loginPage.goto();
  await loginPage.login(testData.users.admin.username, testData.users.admin.password);
  await layoutPage.logout();
  await expect(loginPage.signinButton).toBeVisible();
});
