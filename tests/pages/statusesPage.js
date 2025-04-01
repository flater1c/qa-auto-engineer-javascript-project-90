export class StatusesPage {
  constructor(page) {
    this.createStatusButton = page.getByRole('link', { name: /Create/i });
    this.nameInput = page.getByRole('textbox', { name: /Name/i });
    this.slugInput = page.getByRole('textbox', { name: /Slug/i });
    this.saveButton = page.getByRole('button', { name: /Save/i });
    this.deleteButton = page.getByRole('button', { name: /Delete/i });
    this.statusLink = page.getByRole('cell').nth(1);
    this.statusTableRow = page.getByRole('row');
  }

  async proceedToStatusCreate() {
    await this.createStatusButton.click();
  }

  async proceedToStatusEdit() {
    await this.statusLink.click();
  }

  async deleteStatus() {
    await this.deleteButton.click();
  }

  async fillStatusData(name, slug) {
    await this.nameInput.fill(name);
    await this.slugInput.fill(slug);
    await this.saveButton.click();
  }

  async bulkDeleteStatus() {
    const checkbox1 = this.statusTableRow.getByRole('checkbox').nth(1);
    const id1 = this.statusTableRow.nth(1).getByRole('cell').nth(1).textContent();
    const checkbox2 = this.statusTableRow.getByRole('checkbox').nth(2);
    const id2 = this.statusTableRow.nth(2).getByRole('cell').nth(1).textContent();
    const checkbox3 = this.statusTableRow.getByRole('checkbox').nth(4);
    const id3 = this.statusTableRow.nth(4).getByRole('cell').nth(1).textContent();
    await checkbox1.click();
    await checkbox2.click();
    await checkbox3.click();
    await this.deleteButton.click();
    return [id1, id2, id3];
  }
}
