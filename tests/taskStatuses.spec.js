import { expect } from '@playwright/test';
import { test } from './utils/fixtures.js';
import { LoginPage } from './pages/loginPage.js';
import { LayoutPage } from './pages/layoutPage.js';
import { StatusesPage } from './pages/statusesPage.js';

let loginPage;
let statusesPage;
let layoutPage;

test.beforeEach(async ({ page, testData }) => {
  loginPage = new LoginPage(page);
  layoutPage = new LayoutPage(page);
  statusesPage = new StatusesPage(page);
  await loginPage.goto();
  await loginPage.login(testData.users.admin.username, testData.users.admin.password);
  await layoutPage.proceedToTaskStatusesPage();
});

test('create new status', async ({ page, testData }) => {
  await statusesPage.proceedToStatusCreate();
  await expect(statusesPage.nameInput).toBeVisible();
  await statusesPage.fillStatusData(testData.statuses.create.name, testData.statuses.create.slug);
  await layoutPage.proceedToTaskStatusesPage();
  await expect(page.getByText(testData.statuses.create.name)).toBeVisible();
});

test('task statuses list opens correctly', async ({ page }) => {
  await expect(page.getByRole('columnheader', { name: /Name/i })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: /Slug/i })).toBeVisible();
});

test('task status edit', async ({ page, testData }) => {
  await statusesPage.proceedToStatusEdit();
  await statusesPage.fillStatusData(testData.statuses.edit.name, testData.statuses.edit.slug);
  await expect(page.getByText(testData.statuses.edit.name)).toBeVisible();
});

test('delete status', async ({ page }) => {
  await statusesPage.proceedToStatusEdit();
  const nameValue = await statusesPage.nameInput.inputValue();
  await statusesPage.deleteStatus();
  await expect(page.getByText(nameValue)).not.toBeVisible();
});

test('bulk delete statuses', async ({ page }) => {
  const selectedIds = await statusesPage.bulkDeleteStatus();
  for (const id of selectedIds) {
    await expect(page.getByText(id)).not.toBeVisible();
  }
});
