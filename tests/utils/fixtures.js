import fs from 'fs';
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { BasePage } from '../pages/BasePage.js';
import { LabelsPage } from '../pages/LabelsPage.js';
import { TasksPage } from '../pages/TasksPage.js';
import { StatusesPage } from '../pages/StatusesPage.js';
import { UsersPage } from '../pages/UsersPage.js';

const testData = JSON.parse(fs.readFileSync(new URL('./testData.json', import.meta.url), 'utf-8'));

export const test = base.extend({
  testData,

  loginAndSetup: async ({ page, testData }, use) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    await loginPage.goto();
    await loginPage.login(testData.users.admin.username, testData.users.admin.password);
    await use({ page, basePage });
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  basePage: async ({ loginAndSetup }, use) => {
    const { basePage } = loginAndSetup;
    await use(basePage);
  },

  labelsPage: async ({ page, loginAndSetup }, use) => {
    const { basePage } = loginAndSetup;
    const labelsPage = new LabelsPage(page);
    await basePage.proceedToLabelsPage();
    await use(labelsPage);
  },

  tasksPage: async ({ page, testData, loginAndSetup }, use) => {
    const { basePage } = loginAndSetup;
    const tasksPage = new TasksPage(page, testData);
    await basePage.proceedToTasksPage();
    await use(tasksPage);
  },

  statusesPage: async ({ page, testData, loginAndSetup }, use) => {
    const { basePage } = loginAndSetup;
    const statusesPage = new StatusesPage(page, testData);
    await basePage.proceedToTaskStatusesPage();
    await use(statusesPage);
  },

  usersPage: async ({ page, testData, loginAndSetup }, use) => {
    const { basePage } = loginAndSetup;
    const usersPage = new UsersPage(page, testData);
    await basePage.proceedToUsersPage();
    await use(usersPage);
  },
});
