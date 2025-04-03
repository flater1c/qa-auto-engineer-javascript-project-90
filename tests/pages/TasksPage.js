import { expect } from '@playwright/test';
import { LayoutPage } from './LayoutPage.js';

export class TasksPage extends LayoutPage {
  constructor(page, testData) {
    super(page);
    this.createTaskButton = page.getByRole('link', { name: /Create/i });
    this.assigneeDropdown = page.getByRole('combobox', { name: /Assignee/i });
    this.assigneeValue = page.getByRole('option', { name: testData.tasks.create.assignee });
    this.titleInput = page.getByRole('textbox', { name: /Title/i });
    this.contentInput = page.getByRole('textbox', { name: /Content/i });
    this.statusDropdown = page.getByRole('combobox', { name: /Status/i });
    this.statusValue = page.getByRole('option', { name: /Published/i });
    this.labelDropdown = page.getByRole('combobox', { name: /Label/i });
    this.labelValue = page.getByRole('option', { name: testData.tasks.create.label });
    this.saveButton = page.getByRole('button', { name: /Save/i });
    this.emptySpace = page.locator('body');
    this.editButton = page.getByRole('link', { name: /Edit/i }).nth(0);
    this.showButton = page.getByRole('link', { name: /Show/i }).nth(0);
    this.targetColumn = page.locator('.css-y5568f').nth(4);
    this.deleteButton = page.getByRole('button', { name: /Delete/i });
    this.columns = page.locator('.css-1xphtog');
  }

  async goto() {
    await this.page.goto('/#/tasks');
  }

  async verifyTaskHeaders(headers) {
    for (const header of headers) {
      await expect(this.page.getByRole('heading', { name: header })).toBeVisible();
    }
  }

  async proceedToTaskCreate() {
    await this.createTaskButton.click();
  }

  async proceedToTaskEdit() {
    await this.editButton.click();
  }

  async proceedToTask() {
    await this.showButton.click();
  }

  async deleteTask() {
    await this.deleteEntity(() => this.titleInput.inputValue());
  }

  async fillTaskData(title, content) {
    await this.assigneeDropdown.click();
    await this.assigneeValue.click();
    await this.titleInput.fill(title);
    await this.contentInput.fill(content);
    await this.statusDropdown.click();
    await this.statusValue.click();
    await this.labelDropdown.click();
    await this.labelValue.click();
    await this.emptySpace.click();
    await this.saveButton.click();
  }

  async filterTasksByAssignee() {
    await this.assigneeDropdown.click();
    await this.assigneeValue.click();
    await this.page.waitForTimeout(500);
  }

  async filterTasksByStatus() {
    await this.statusDropdown.click();
    await this.statusValue.click();
    await this.page.waitForTimeout(1000);
  }

  async filterTasksByLabel() {
    await this.labelDropdown.click();
    await this.labelValue.click();
    await this.page.waitForTimeout(500);
  }
}
