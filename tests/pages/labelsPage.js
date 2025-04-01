export class LabelsPage {
  constructor(page) {
    this.page = page;
    this.createLabelButton = page.getByRole('link', { name: /Create/i });
    this.nameInput = page.getByRole('textbox', { name: /Name/i });
    this.saveButton = page.getByRole('button', { name: /Save/i });
    this.deleteButton = page.getByRole('button', { name: /Delete/i });
    this.labelLink = page.getByRole('cell').nth(1);
    this.labelTableRow = page.getByRole('row');
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
    await this.deleteButton.click();
  }

  async fillLabelData(name) {
    await this.nameInput.fill(name);
    await this.saveButton.click();
  }

  async bulkDeleteLabel() {
    const checkbox1 = this.labelTableRow.getByRole('checkbox').nth(1);
    const id1 = this.labelTableRow.nth(1).getByRole('cell').nth(1).textContent();
    const checkbox2 = this.labelTableRow.getByRole('checkbox').nth(2);
    const id2 = this.labelTableRow.nth(2).getByRole('cell').nth(1).textContent();
    const checkbox3 = this.labelTableRow.getByRole('checkbox').nth(4);
    const id3 = this.labelTableRow.nth(4).getByRole('cell').nth(1).textContent();
    await checkbox1.click();
    await checkbox2.click();
    await checkbox3.click();
    await this.deleteButton.click();
    return [id1, id2, id3];
  }
}
