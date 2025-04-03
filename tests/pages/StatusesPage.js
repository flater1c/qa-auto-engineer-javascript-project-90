import { BasePage } from './BasePage.js';

export class StatusesPage extends BasePage {
  constructor(page) {
    super(page);
    this.createStatusButton = page.getByRole('link', { name: /Create/i });
    this.nameInput = page.getByRole('textbox', { name: /Name/i });
    this.slugInput = page.getByRole('textbox', { name: /Slug/i });
    this.saveButton = page.getByRole('button', { name: /Save/i });
    this.deleteButton = page.getByRole('button', { name: /Delete/i });
    this.statusLink = page.getByRole('cell').nth(1);
  }

  async goto() {
    await this.page.goto('/#/task_statuses');
  }

  async proceedToStatusCreate() {
    await this.createStatusButton.click();
  }

  async proceedToStatusEdit() {
    await this.statusLink.click();
  }

  async deleteStatus() {
    await this.deleteEntity(() => this.nameInput.inputValue());
  }

  async fillStatusData(name, slug) {
    await this.nameInput.fill(name);
    await this.slugInput.fill(slug);
    await this.saveButton.click();
  }
}
