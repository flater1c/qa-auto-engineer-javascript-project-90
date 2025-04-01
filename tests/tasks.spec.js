import { expect } from '@playwright/test';
import { test } from './utils/fixtures.js';
import { LoginPage } from './pages/loginPage.js';
import { LayoutPage } from './pages/layoutPage.js';
import { TasksPage } from './pages/tasksPage.js';

let loginPage;
let layoutPage;
let tasksPage;

test.beforeEach(async ({ page, testData }) => {
  loginPage = new LoginPage(page);
  layoutPage = new LayoutPage(page);
  tasksPage = new TasksPage(page, testData);
  await loginPage.goto();
  await loginPage.login(testData.users.admin.username, testData.users.admin.password);
  await layoutPage.proceedToTasksPage();
});

test('create new task', async ({ page, testData }) => {
  await tasksPage.proceedToTaskCreate();
  await expect(tasksPage.assigneeDropdown).toBeVisible();
  await tasksPage.fillTaskData(testData.tasks.create.title, testData.tasks.create.content);
  await layoutPage.proceedToTasksPage();
  await expect(page.getByText(testData.tasks.create.title)).toBeVisible();
});

test('task board opens correctly', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /Draft/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /To Review/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /To Be Fixed/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /To Publish/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Published/i })).toBeVisible();
});

test('task edit and moving to another column', async ({ page, testData }) => {
  await tasksPage.proceedToTaskEdit();
  await tasksPage.fillTaskData(testData.tasks.edit.title, testData.tasks.edit.content);
  await expect(page.getByText(testData.tasks.edit.title)).toBeVisible();
  await expect(tasksPage.targetColumn.locator('.MuiCardContent-root', { hasText: testData.tasks.edit.title })).toBeVisible();
});

test('delete task', async ({ page }) => {
  await tasksPage.proceedToTaskEdit();
  const nameValue = await tasksPage.titleInput.inputValue();
  await tasksPage.deleteTask();
  await expect(page.getByText(nameValue)).not.toBeVisible();
});

test('filtering tasks by assignee', async ({ page, testData }) => {
  await tasksPage.filterTasksByAssignee();
  await tasksPage.proceedToTask();
  await expect(page.getByText(testData.tasks.create.assignee)).toBeVisible();
});

test('filtering tasks by status', async () => {
  await tasksPage.filterTasksByStatus();
  let nonEmptyColumns = 0;
  const columns = await tasksPage.columns.all();
  for (const column of columns) {
    const taskCount = await column.locator('.css-1lt5qva-MuiCardContent-root').count();
    if (taskCount > 0) {
      nonEmptyColumns++;
    }
  }
  await expect(nonEmptyColumns).toBe(1);
});

test('filtering tasks by label', async ({ page, testData }) => {
  await tasksPage.filterTasksByLabel();
  await tasksPage.proceedToTask();
  await expect(page.getByText(testData.tasks.create.label)).toBeVisible();
});
