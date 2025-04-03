import { expect } from '@playwright/test';

export class LayoutPage {
  constructor(page) {
    this.page = page;
    this.profileButton = page.getByRole('button', { name: /Profile/i });
    this.usersButton = page.getByRole('menuitem', { name: /Users/i });
    this.taskStatusesButton = page.getByRole('menuitem', { name: /Task Statuses/i });
    this.labelsButton = page.getByRole('menuitem', { name: /Labels/i });
    this.tasksButton = page.getByRole('menuitem', { name: /Tasks/i });
    this.logoutButton = page.getByRole('menuitem', { name: /Logout/i });
    this.deleteButton = page.getByRole('button', { name: /Delete/i });
  }

  async deleteEntity(getValueFn) {
    const value = await getValueFn();
    await this.page.getByRole('button', { name: /Delete/i }).click();
    await expect(this.page.getByText(value)).not.toBeVisible();
  }

  async verifyEntityExists(entityName) {
    await expect(this.page.getByText(entityName)).toBeVisible();
  }

  async verifyInputsVisible(inputs) {
    for (const input of inputs) {
      await expect(input).toBeVisible();
    }
  }

  async verifyTableHeaders(headers) {
    for (const header of headers) {
      await expect(this.page.getByRole('columnheader', { name: header })).toBeVisible();
    }
  }

  async bulkDeleteEntities(getTableRows) {
    const tableRows = await getTableRows();
    const selectedIds = [];
    for (const row of tableRows.slice(1, 4)) {
      const checkbox = await row.getByRole('checkbox');
      const id = await row.getByRole('cell').nth(2).textContent();

      await checkbox.click();
      selectedIds.push(id);
    }
    await expect(this.deleteButton).toBeEnabled();
    await this.deleteButton.click();
    for (const id of selectedIds) {
      await expect(this.page.getByText(id)).not.toBeVisible();
    }
  }

  async getTableRows() {
    return await this.page.getByRole('row').all();
  }

  async logout() {
    await this.profileButton.click();
    await this.logoutButton.click();
  }

  async proceedToUsersPage() {
    await this.usersButton.click();
  }

  async proceedToTaskStatusesPage() {
    await this.taskStatusesButton.click();
  }

  async proceedToLabelsPage() {
    await this.labelsButton.click();
  }

  async proceedToTasksPage() {
    await this.tasksButton.click();
  }
}
