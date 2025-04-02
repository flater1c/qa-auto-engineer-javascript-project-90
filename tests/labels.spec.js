import { expect } from '@playwright/test';
import { test } from './utils/fixtures.js';

test('create new label', async ({ labelsPage }) => {
  await labelsPage.proceedToLabelCreate();
  await expect(labelsPage.nameInput).toBeVisible();
  await labelsPage.fillLabelData('NewLabel');
  await expect(labelsPage.page.getByText('NewLabel')).toBeVisible();
});

test('labels list opens correctly', async ({ labelsPage }) => {
  await expect(labelsPage.page.getByRole('columnheader', { name: /Name/i })).toBeVisible();
  await expect(labelsPage.page.getByRole('columnheader', { name: /Created at/i })).toBeVisible();
});

test('label edit', async ({ labelsPage }) => {
  await labelsPage.proceedToLabelEdit();
  await labelsPage.fillLabelData('EditedLabel');
  await expect(labelsPage.page.getByText('EditedLabel')).toBeVisible();
});

test('delete label', async ({ labelsPage }) => {
  await labelsPage.proceedToLabelEdit();
  const nameValue = await labelsPage.nameInput.inputValue();
  await labelsPage.deleteLabel();
  await expect(labelsPage.page.getByText(nameValue)).not.toBeVisible();
});

test('bulk delete labels', async ({ labelsPage }) => {
  const selectedIds = await labelsPage.bulkDeleteLabel();
  for (const id of selectedIds) {
    await expect(labelsPage.page.getByText(id)).not.toBeVisible();
  }
});
