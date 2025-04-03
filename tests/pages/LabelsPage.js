import { BasePage } from './BasePage.js';

export class LabelsPage extends BasePage {
  constructor(page) {
    super(page);
    this.createLabelButton = page.getByRole('link', { name: /Create/i });
    this.nameInput = page.getByRole('textbox', { name: /Name/i });
    this.saveButton = page.getByRole('button', { name: /Save/i });
    this.labelLink = page.getByRole('cell').nth(1);
  }

  async goto() {
    await this.page.goto('/#/labels');
  }

  async proceedToLabelCreate() {
    await this.createLabelButton.click();
  }

  async proceedToLabelEdit() {
    await this.labelLink.click();
  }

  async deleteLabel() {
    await this.deleteEntity(() => this.nameInput.inputValue());
  }

  async fillLabelData(name) {
    await this.nameInput.fill(name);
    await this.saveButton.click();
  }
}
