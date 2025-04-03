import { expect } from '@playwright/test';
import { test } from './utils/fixtures.js';

test('create new label', async ({ labelsPage }) => {
  await labelsPage.proceedToLabelCreate();
  await expect(labelsPage.nameInput).toBeVisible();
  await labelsPage.fillLabelData('NewLabel');
  await labelsPage.verifyEntityExists('NewLabel');
});

test('labels list opens correctly', async ({ labelsPage }) => {
  await labelsPage.verifyTableHeaders(['Name', 'Created at']);
});

test('label edit', async ({ labelsPage }) => {
  await labelsPage.proceedToLabelEdit();
  await labelsPage.fillLabelData('EditedLabel');
  await labelsPage.verifyEntityExists('EditedLabel');
});

test('delete label', async ({ labelsPage }) => {
  await labelsPage.proceedToLabelEdit();
  await labelsPage.deleteLabel();
});

test('bulk delete labels', async ({ labelsPage }) => {
  await labelsPage.bulkDeleteEntities(() => labelsPage.getTableRows());
});
