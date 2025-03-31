// @ts-check
import { test, expect } from '@playwright/test';
import { users } from './fixtures/users.js'
import { statuses } from './fixtures/statuses.js'
import { tasks } from './fixtures/tasks.js'
import { LoginPage} from './pages/loginPage.js';
import { LayoutPage} from './pages/layoutPage.js';
import { UsersPage } from "./pages/usersPage.js";
import { StatusesPage } from './pages/statusesPage.js';
import { LabelsPage } from './pages/labelsPage.js';
import { TasksPage } from './pages/tasksPage.js';

test('Rendering successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
});

test('login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await expect(page.getByText(/Welcome to the administration/i)).toBeVisible();
});

test('logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.logout();
    await expect(loginPage.signinButton).toBeVisible();
});

test('user creation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const usersPage = new UsersPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToUsersPage();
    await usersPage.proceedToUserCreate();
    await expect(usersPage.emailInput).toBeVisible();
    await expect(usersPage.firstNameInput).toBeVisible();
    await expect(usersPage.lastNameInput).toBeVisible();
    await expect(usersPage.saveButton).toBeVisible();
    await usersPage.fillUserData(users.userToCreate.email, users.userToCreate.firstName, users.userToCreate.lastName)
    await layoutPage.proceedToUsersPage();
    await expect(page.getByText(users.userToCreate.email)).toBeVisible();
});

test('users list opens correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToUsersPage();
    await expect(page.getByRole('columnheader', { name: /Email/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /First Name/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Last Name/i })).toBeVisible();
});

test('user edit', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const usersPage = new UsersPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToUsersPage();
    await usersPage.proceedToUserEdit();
    await usersPage.fillUserData(users.userToEdit.email, users.userToEdit.firstName, users.userToEdit.lastName);
    await expect(page.getByText(users.userToEdit.email)).toBeVisible();
});

test('user edit email validation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const usersPage = new UsersPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToUsersPage();
    await usersPage.proceedToUserEdit();
    await usersPage.fillUserData(users.userToEditInvalid.email, users.userToEditInvalid.firstName, users.userToEditInvalid.lastName);
    await expect(page.getByText(users.userToEditInvalid.errorMessage)).toBeVisible();
});

test('delete user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const usersPage = new UsersPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToUsersPage();
    await usersPage.proceedToUserEdit();
    const emailValue = await usersPage.emailInput.inputValue()
    await usersPage.deleteUser();
    await expect(page.getByText(emailValue)).not.toBeVisible();
});

test('bulk delete users', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const usersPage = new UsersPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToUsersPage();
    const selectedIds = await usersPage.bulkDeleteUser();
    for (const id of selectedIds) {
        await expect(page.getByText(id)).not.toBeVisible();
    }
});

test('create new status', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const statusesPage = new StatusesPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToTaskStatusesPage();
    await statusesPage.proceedToStatusCreate();
    await expect(statusesPage.nameInput).toBeVisible();
    await statusesPage.fillStatusData(statuses.create.name, statuses.create.slug);
    await layoutPage.proceedToTaskStatusesPage();
    await expect(page.getByText(statuses.create.name)).toBeVisible();
});

test('task statuses list opens correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToTaskStatusesPage();
    await expect(page.getByRole('columnheader', { name: /Name/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Slug/i })).toBeVisible();
});

test('task status edit', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const statusesPage = new StatusesPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToTaskStatusesPage();
    await statusesPage.proceedToStatusEdit();
    await statusesPage.fillStatusData(statuses.edit.name, statuses.edit.slug);
    await expect(page.getByText(statuses.edit.name)).toBeVisible();
});

test('delete status', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const statusesPage = new StatusesPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToTaskStatusesPage();
    await statusesPage.proceedToStatusEdit();
    const nameValue = await statusesPage.nameInput.inputValue()
    await statusesPage.deleteStatus();
    await expect(page.getByText(nameValue)).not.toBeVisible();
});

test('bulk delete statuses', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const statusesPage = new StatusesPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToTaskStatusesPage();
    const selectedIds = await statusesPage.bulkDeleteStatus();
    for (const id of selectedIds) {
        await expect(page.getByText(id)).not.toBeVisible();
    }
});

test('create new label', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const labelsPage = new LabelsPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToLabelsPage();
    await labelsPage.proceedToLabelCreate();
    await expect(labelsPage.nameInput).toBeVisible();
    await labelsPage.fillLabelData('NewLabel');
    await layoutPage.proceedToLabelsPage();
    await expect(page.getByText('NewLabel')).toBeVisible();
});

test('labels list opens correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToLabelsPage();
    await expect(page.getByRole('columnheader', { name: /Name/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /Created at/i })).toBeVisible();
});

test('label edit', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const labelsPage = new LabelsPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToLabelsPage();
    await labelsPage.proceedToLabelEdit();
    await labelsPage.fillLabelData('EditedLabel');
    await expect(page.getByText('EditedLabel')).toBeVisible();
});

test('delete label', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const labelsPage = new LabelsPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToLabelsPage();
    await labelsPage.proceedToLabelEdit();
    const nameValue = await labelsPage.nameInput.inputValue()
    await labelsPage.deleteLabel();
    await expect(page.getByText(nameValue)).not.toBeVisible();
});

test('bulk delete labels', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const labelsPage = new LabelsPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToLabelsPage();
    const selectedIds = await labelsPage.bulkDeleteLabel();
    for (const id of selectedIds) {
        await expect(page.getByText(id)).not.toBeVisible();
    }
});

test('create new task', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const tasksPage = new TasksPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToTasksPage();
    await tasksPage.proceedToTaskCreate();
    await expect(tasksPage.assigneeDropdown).toBeVisible();
    await tasksPage.fillTaskData(tasks.create.title, tasks.create.content);
    await layoutPage.proceedToTasksPage();
    await expect(page.getByText(tasks.create.title)).toBeVisible();
});

test('task board opens correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToTasksPage();
    await expect(page.getByRole('heading', { name: /Draft/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /To Review/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /To Be Fixed/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /To Publish/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Published/i })).toBeVisible();
});

test('task edit and moving to another column', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const tasksPage = new TasksPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToTasksPage();
    await tasksPage.proceedToTaskEdit();
    await tasksPage.fillTaskData(tasks.edit.title, tasks.edit.content);
    await expect(page.getByText(tasks.edit.title)).toBeVisible();
    await expect(tasksPage.targetColumn.locator('.MuiCardContent-root', { hasText: tasks.edit.title })).toBeVisible();

});

test('delete task', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const tasksPage = new TasksPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToTasksPage();
    await tasksPage.proceedToTaskEdit();
    const nameValue = await tasksPage.titleInput.inputValue()
    await tasksPage.deleteTask();
    await expect(page.getByText(nameValue)).not.toBeVisible();
});

test('filtering tasks by assignee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const tasksPage = new TasksPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToTasksPage();
    await tasksPage.filterTasksByAssignee();
    await tasksPage.proceedToTask();
    await expect(page.getByText(tasks.create.assignee)).toBeVisible();
});

test('filtering tasks by status', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const tasksPage = new TasksPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToTasksPage();
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

test('filtering tasks by label', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const layoutPage = new LayoutPage(page);
    const tasksPage = new TasksPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await layoutPage.proceedToTasksPage();
    await tasksPage.filterTasksByLabel();
    await tasksPage.proceedToTask();
    await expect(page.getByText(tasks.create.label)).toBeVisible();
});

