import { expect } from '@playwright/test';
import { test } from './utils/fixtures.js';

test('create new status', async ({ statusesPage, testData }) => {
  await statusesPage.proceedToStatusCreate();
  await expect(statusesPage.nameInput).toBeVisible();
  await statusesPage.fillStatusData(testData.statuses.create.name, testData.statuses.create.slug);
  await statusesPage.verifyEntityExists(testData.statuses.create.name);
});

test('task statuses list opens correctly', async ({ statusesPage }) => {
  await statusesPage.verifyTableHeaders(['Name', 'Slug']);
});

test('task status edit', async ({ statusesPage, testData }) => {
  await statusesPage.proceedToStatusEdit();
  await statusesPage.fillStatusData(testData.statuses.edit.name, testData.statuses.edit.slug);
  await statusesPage.verifyEntityExists(testData.statuses.edit.name);
});

test('delete status', async ({ statusesPage }) => {
  await statusesPage.proceedToStatusEdit();
  await statusesPage.deleteStatus();
});

test('bulk delete statuses', async ({ statusesPage }) => {
  await statusesPage.bulkDeleteEntities(() => statusesPage.getTableRows());
});
