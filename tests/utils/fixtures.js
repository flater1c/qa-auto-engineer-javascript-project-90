import { test as base } from '@playwright/test';
import testData from './testData.json' assert { type: 'json' };
import { LoginPage } from '../pages/LoginPage.js';
import { LayoutPage } from '../pages/LayoutPage.js';
import { LabelsPage } from '../pages/LabelsPage.js';
import { TasksPage } from '../pages/TasksPage.js';
import { StatusesPage } from '../pages/StatusesPage.js';
import { UsersPage } from '../pages/UsersPage.js';

export const test = base.extend({
    testData: async ({}, use) => {
        await use(testData);
    },

    loginAndSetup: async ({ page, testData }, use) => {
        const loginPage = new LoginPage(page);
        const layoutPage = new LayoutPage(page);

        await loginPage.goto();
        await loginPage.login(testData.users.admin.username, testData.users.admin.password);

        await use({ page, layoutPage });
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await use(loginPage);
    },

    layoutPage: async ({ page, loginAndSetup }, use) => {
        const { layoutPage } = loginAndSetup;
        await use(layoutPage);
    },

    labelsPage: async ({ page, loginAndSetup }, use) => {
        const { layoutPage } = loginAndSetup;
        const labelsPage = new LabelsPage(page);
        await layoutPage.proceedToLabelsPage();
        await use(labelsPage);
    },

    tasksPage: async ({ page, testData, loginAndSetup }, use) => {
        const { layoutPage } = loginAndSetup;
        const tasksPage = new TasksPage(page, testData,);
        await layoutPage.proceedToTasksPage();
        await use(tasksPage);
    },

    statusesPage: async ({ page, testData, loginAndSetup }, use) => {
        const { layoutPage } = loginAndSetup;
        const statusesPage = new StatusesPage(page, testData);
        await layoutPage.proceedToTaskStatusesPage();
        await use(statusesPage);
    },

    usersPage: async ({ page, testData, loginAndSetup }, use) => {
        const { layoutPage } = loginAndSetup;
        const usersPage = new UsersPage(page, testData);
        await layoutPage.proceedToUsersPage();
        await use(usersPage);
    }
});
