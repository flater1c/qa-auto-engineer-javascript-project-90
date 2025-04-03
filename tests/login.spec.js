import { expect } from '@playwright/test';
import { test } from './utils/fixtures.js';

test('Rendering successfully', async ({ loginPage }) => {
  await expect(loginPage.page.getByRole('button', { name: /Sign In/i })).toBeVisible();
});

test('login', async ({ loginPage, testData }) => {
  await loginPage.login(testData.users.admin.username, testData.users.admin.password);
  await expect(loginPage.page.getByText(/Welcome to the administration/i)).toBeVisible();
});

test('logout', async ({ loginPage, basePage }) => {
  await basePage.logout();
  await expect(loginPage.signinButton).toBeVisible();
});
