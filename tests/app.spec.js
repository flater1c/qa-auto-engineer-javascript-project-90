// @ts-check
import { test, expect } from '@playwright/test';
import { users } from './fixtures/users.js'
import { LoginPage} from './pages/loginPage.js';
import { DashboardPage} from './pages/dashboardPage.js';

test('Rendering successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
});

test('login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await expect(page.getByText(/Welcome to the administration/i)).toBeVisible();
});

test('logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await dashboardPage.logout();
    expect(loginPage.signinButton).toBeVisible();
});
