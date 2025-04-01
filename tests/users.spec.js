import { expect } from '@playwright/test';
import { test } from './utils/fixtures.js';
import { LoginPage } from './pages/loginPage.js';
import { LayoutPage } from './pages/layoutPage.js';
import { UsersPage } from './pages/usersPage.js';

let loginPage;
let usersPage;
let layoutPage;

test.beforeEach(async ({ page, testData }) => {
  loginPage = new LoginPage(page);
  layoutPage = new LayoutPage(page);
  usersPage = new UsersPage(page);
  await loginPage.goto();
  await loginPage.login(testData.users.admin.username, testData.users.admin.password);
  await layoutPage.proceedToUsersPage();
});

test('user creation', async ({ page, testData }) => {
  await usersPage.proceedToUserCreate();
  await expect(usersPage.emailInput).toBeVisible();
  await expect(usersPage.firstNameInput).toBeVisible();
  await expect(usersPage.lastNameInput).toBeVisible();
  await expect(usersPage.saveButton).toBeVisible();
  await usersPage.fillUserData(
    testData.users.userToCreate.email,
    testData.users.userToCreate.firstName,
    testData.users.userToCreate.lastName,
  );
  await layoutPage.proceedToUsersPage();
  await expect(page.getByText(testData.users.userToCreate.email)).toBeVisible();
});

test('users list opens correctly', async ({ page }) => {
  await expect(page.getByRole('columnheader', { name: /Email/i })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: /First Name/i })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: /Last Name/i })).toBeVisible();
});

test('user edit', async ({ page, testData }) => {
  await usersPage.proceedToUserEdit();
  await usersPage.fillUserData(
      testData.users.userToEdit.email,
      testData.users.userToEdit.firstName,
      testData.users.userToEdit.lastName
  );
  await expect(page.getByText(testData.users.userToEdit.email)).toBeVisible();
});

test('user edit email validation', async ({ page, testData }) => {
  await usersPage.proceedToUserEdit();
  await usersPage.fillUserData(
      testData.users.userToEditInvalid.email,
      testData.users.userToEditInvalid.firstName,
      testData.users.userToEditInvalid.lastName
  );
  await expect(page.getByText(testData.users.userToEditInvalid.errorMessage)).toBeVisible();
});

test('delete user', async ({ page }) => {
  await usersPage.proceedToUserEdit();
  const emailValue = await usersPage.emailInput.inputValue();
  await usersPage.deleteUser();
  await expect(page.getByText(emailValue)).not.toBeVisible();
});

test('bulk delete users', async ({ page }) => {
  const selectedIds = await usersPage.bulkDeleteUser();
  for (const id of selectedIds) {
    await expect(page.getByText(id)).not.toBeVisible();
  }
});
