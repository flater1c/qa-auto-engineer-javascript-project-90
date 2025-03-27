// @ts-check
import { test, expect } from '@playwright/test';
import { users } from './fixtures/users.js'
import { LoginPage} from './pages/loginPage.js';
import { DashboardPage} from './pages/dashboardPage.js';
import {UsersPage} from "./pages/usersPage.js";

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
    await expect(loginPage.signinButton).toBeVisible();
});

test('user creation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const usersPage = new UsersPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await dashboardPage.proceedToUsersPage();
    await usersPage.proceedToUserCreate();
    await expect(usersPage.emailInput).toBeVisible();
    await expect(usersPage.firstNameInput).toBeVisible();
    await expect(usersPage.lastNameInput).toBeVisible();
    await expect(usersPage.saveButton).toBeVisible();
    await usersPage.fillUserData(users.userToCreate.email, users.userToCreate.firstName, users.userToCreate.lastName)
    await dashboardPage.proceedToUsersPage();
    await expect(page.getByText(users.userToCreate.email)).toBeVisible();
});

test('users list opens correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await dashboardPage.proceedToUsersPage();
    await expect(page.getByRole('columnheader', { name: /Email/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /First Name/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Last Name/i })).toBeVisible();
});

test('user edit' , async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const usersPage = new UsersPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await dashboardPage.proceedToUsersPage();
    await usersPage.proceedToUserEdit();
    await usersPage.fillUserData(users.userToEdit.email, users.userToEdit.firstName, users.userToEdit.lastName);
    await expect(page.getByText(users.userToEdit.email)).toBeVisible();
});

test('user edit email validation' , async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const usersPage = new UsersPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await dashboardPage.proceedToUsersPage();
    await usersPage.proceedToUserEdit();
    await usersPage.fillUserData(users.userToEditInvalid.email, users.userToEditInvalid.firstName, users.userToEditInvalid.lastName);
    await expect(page.getByText(users.userToEditInvalid.errorMessage)).toBeVisible();
});

test('delete user' , async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const usersPage = new UsersPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await dashboardPage.proceedToUsersPage();
    await usersPage.proceedToUserEdit();
    const emailValue = await usersPage.emailInput.inputValue()
    await usersPage.deleteUser();
    await expect(page.getByText(emailValue)).not.toBeVisible();
});

test('bulk delete users' , async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const usersPage = new UsersPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await dashboardPage.proceedToUsersPage();
    const selectedIds = await usersPage.bulkDeleteUser();
    for (const id of selectedIds) {
        await expect(page.getByText(id)).not.toBeVisible();
    }
});
