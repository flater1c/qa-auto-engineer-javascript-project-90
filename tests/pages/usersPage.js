export class UsersPage {
  constructor(page) {
    this.userLink = page.getByText(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    this.createUserButton = page.getByRole('link', { name: /Create/i });
    this.emailInput = page.getByRole('textbox', { name: /Email/i });
    this.firstNameInput = page.getByRole('textbox', { name: /First Name/i });
    this.lastNameInput = page.getByRole('textbox', { name: /Last Name/i });
    this.saveButton = page.getByRole('button', { name: /Save/i });
    this.deleteButton = page.getByRole('button', { name: /Delete/i });
    this.usersTableRow = page.getByRole('row');
  }

  async proceedToUserCreate() {
    await this.createUserButton.click();
  }

  async proceedToUserEdit() {
    await this.userLink.first().click();
  }

  async deleteUser() {
    await this.deleteButton.click();
  }

  async bulkDeleteUser() {
    const checkbox1 = this.usersTableRow.getByRole('checkbox').nth(1);
    const id1 = this.usersTableRow.nth(1).getByRole('cell').nth(1).textContent();
    const checkbox2 = this.usersTableRow.getByRole('checkbox').nth(2);
    const id2 = this.usersTableRow.nth(2).getByRole('cell').nth(1).textContent();
    const checkbox3 = this.usersTableRow.getByRole('checkbox').nth(4);
    const id3 = this.usersTableRow.nth(4).getByRole('cell').nth(1).textContent();
    await checkbox1.click();
    await checkbox2.click();
    await checkbox3.click();
    await this.deleteButton.click();
    return [id1, id2, id3];
  }

  async fillUserData(email, firstName, lastName) {
    await this.emailInput.fill(email);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }
}
