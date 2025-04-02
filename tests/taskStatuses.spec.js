import { expect } from '@playwright/test';
import { test } from './utils/fixtures.js';

test('create new status', async ({ statusesPage, testData }) => {
  await statusesPage.proceedToStatusCreate();
  await expect(statusesPage.nameInput).toBeVisible();
  await statusesPage.fillStatusData(testData.statuses.create.name, testData.statuses.create.slug);
  await expect(statusesPage.page.getByText(testData.statuses.create.name)).toBeVisible();
});

test('task statuses list opens correctly', async ({ statusesPage }) => {
  await expect(statusesPage.page.getByRole('columnheader', { name: /Name/i })).toBeVisible();
  await expect(statusesPage.page.getByRole('columnheader', { name: /Slug/i })).toBeVisible();
});

test('task status edit', async ({ statusesPage, testData }) => {
  await statusesPage.proceedToStatusEdit();
  await statusesPage.fillStatusData(testData.statuses.edit.name, testData.statuses.edit.slug);
  await expect(statusesPage.page.getByText(testData.statuses.edit.name)).toBeVisible();
});

test('delete status', async ({ statusesPage }) => {
  await statusesPage.proceedToStatusEdit();
  const nameValue = await statusesPage.nameInput.inputValue();
  await statusesPage.deleteStatus();
  await expect(statusesPage.page.getByText(nameValue)).not.toBeVisible();
});

test('bulk delete statuses', async ({ statusesPage }) => {
  const selectedIds = await statusesPage.bulkDeleteStatus();
  for (const id of selectedIds) {
    await expect(statusesPage.page.getByText(id)).not.toBeVisible();
  }
});
