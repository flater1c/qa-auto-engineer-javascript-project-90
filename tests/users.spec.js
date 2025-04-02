import { expect } from '@playwright/test';
import { test } from './utils/fixtures.js';

test('user creation', async ({ usersPage, testData }) => {
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
  await expect(usersPage.page.getByText(testData.users.userToCreate.email)).toBeVisible();
});

test('users list opens correctly', async ({ usersPage }) => {
  await expect(usersPage.page.getByRole('columnheader', { name: /Email/i })).toBeVisible();
  await expect(usersPage.page.getByRole('columnheader', { name: /First Name/i })).toBeVisible();
  await expect(usersPage.page.getByRole('columnheader', { name: /Last Name/i })).toBeVisible();
});

test('user edit', async ({ usersPage, testData }) => {
  await usersPage.proceedToUserEdit();
  await usersPage.fillUserData(
    testData.users.userToEdit.email,
    testData.users.userToEdit.firstName,
    testData.users.userToEdit.lastName,
  );
  await expect(usersPage.page.getByText(testData.users.userToEdit.email)).toBeVisible();
});

test('user edit email validation', async ({ usersPage, testData }) => {
  await usersPage.proceedToUserEdit();
  await usersPage.fillUserData(
    testData.users.userToEditInvalid.email,
    testData.users.userToEditInvalid.firstName,
    testData.users.userToEditInvalid.lastName,
  );
  await expect(usersPage.page.getByText(testData.users.userToEditInvalid.errorMessage)).toBeVisible();
});

test('delete user', async ({ usersPage }) => {
  await usersPage.proceedToUserEdit();
  const emailValue = await usersPage.emailInput.inputValue();
  await usersPage.deleteUser();
  await expect(usersPage.page.getByText(emailValue)).not.toBeVisible();
});

test('bulk delete users', async ({ usersPage }) => {
  const selectedIds = await usersPage.bulkDeleteUser();
  for (const id of selectedIds) {
    await expect(usersPage.page.getByText(id)).not.toBeVisible();
  }
});
