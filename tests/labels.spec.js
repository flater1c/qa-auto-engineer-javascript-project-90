import { expect } from '@playwright/test';
import { test } from './utils/fixtures.js';
import { LoginPage } from './pages/loginPage.js';
import { LayoutPage } from './pages/layoutPage.js';
import { LabelsPage } from './pages/labelsPage.js';

let loginPage;
let layoutPage;
let labelsPage;

test.beforeEach(async ({ page, testData }) => {
  loginPage = new LoginPage(page);
  layoutPage = new LayoutPage(page);
  labelsPage = new LabelsPage(page);
  await loginPage.goto();
  await loginPage.login(testData.users.admin.username, testData.users.admin.password);
  await layoutPage.proceedToLabelsPage();
});

test('create new label', async ({ page }) => {
  await labelsPage.proceedToLabelCreate();
  await expect(labelsPage.nameInput).toBeVisible();
  await labelsPage.fillLabelData('NewLabel');
  await layoutPage.proceedToLabelsPage();
  await expect(page.getByText('NewLabel')).toBeVisible();
});

test('labels list opens correctly', async ({ page }) => {
  await expect(page.getByRole('columnheader', { name: /Name/i })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: /Created at/i })).toBeVisible();
});

test('label edit', async ({ page }) => {
  await labelsPage.proceedToLabelEdit();
  await labelsPage.fillLabelData('EditedLabel');
  await expect(page.getByText('EditedLabel')).toBeVisible();
});

test('delete label', async ({ page }) => {
  await labelsPage.proceedToLabelEdit();
  const nameValue = await labelsPage.nameInput.inputValue();
  await labelsPage.deleteLabel();
  await expect(page.getByText(nameValue)).not.toBeVisible();
});

test('bulk delete labels', async ({ page }) => {
  const selectedIds = await labelsPage.bulkDeleteLabel();
  for (const id of selectedIds) {
    await expect(page.getByText(id)).not.toBeVisible();
  }
});
