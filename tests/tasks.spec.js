import { expect } from '@playwright/test';
import { test } from './utils/fixtures.js';

test('create new task', async ({ tasksPage, testData }) => {
  await tasksPage.proceedToTaskCreate();
  await expect(tasksPage.assigneeDropdown).toBeVisible();
  await tasksPage.fillTaskData(testData.tasks.create.title, testData.tasks.create.content);
  await tasksPage.verifyEntityExists(testData.tasks.create.title);
});

test('task board opens correctly', async ({ tasksPage }) => {
  await tasksPage.verifyTaskHeaders(['Draft', 'To Review', 'To Be Fixed', 'To Publish', 'Published']);
});

test('task edit and moving to another column', async ({ tasksPage, testData }) => {
  await tasksPage.proceedToTaskEdit();
  await tasksPage.fillTaskData(testData.tasks.edit.title, testData.tasks.edit.content);
  await expect(tasksPage.page.getByText(testData.tasks.edit.title)).toBeVisible();
  await expect(tasksPage.targetColumn.locator('.MuiCardContent-root', { hasText: testData.tasks.edit.title })).toBeVisible();
});

test('delete task', async ({ tasksPage }) => {
  await tasksPage.proceedToTaskEdit();
  await tasksPage.deleteTask();
});

test('filtering tasks by assignee', async ({ tasksPage, testData }) => {
  await tasksPage.filterTasksByAssignee();
  await tasksPage.proceedToTask();
  await expect(tasksPage.page.getByText(testData.tasks.create.assignee)).toBeVisible();
});

test('filtering tasks by status', async ({ tasksPage }) => {
  await tasksPage.filterTasksByStatus();
  let nonEmptyColumns = 0;
  const columns = await tasksPage.columns.all();
  for (const column of columns) {
    const taskCount = await column.locator('.css-1lt5qva-MuiCardContent-root').count();
    if (taskCount > 0) {
      nonEmptyColumns += 1;
    }
  }
  await expect(nonEmptyColumns).toBe(1);
});

test('filtering tasks by label', async ({ tasksPage, testData }) => {
  await tasksPage.filterTasksByLabel();
  await tasksPage.proceedToTask();
  await expect(tasksPage.page.getByText(testData.tasks.create.label)).toBeVisible();
});
