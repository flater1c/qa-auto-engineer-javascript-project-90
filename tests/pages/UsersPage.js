import { BasePage } from './BasePage.js';

export class UsersPage extends BasePage {
  constructor(page) {
    super(page);
    this.userLink = page.getByText(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    this.createUserButton = page.getByRole('link', { name: /Create/i });
    this.emailInput = page.getByRole('textbox', { name: /Email/i });
    this.firstNameInput = page.getByRole('textbox', { name: /First Name/i });
    this.lastNameInput = page.getByRole('textbox', { name: /Last Name/i });
    this.saveButton = page.getByRole('button', { name: /Save/i });
  }

  async goto() {
    await this.page.goto('/#/users');
  }

  async proceedToUserCreate() {
    await this.createUserButton.click();
  }

  async proceedToUserEdit() {
    await this.userLink.first().click();
  }

  async deleteUser() {
    await this.deleteEntity(() => this.emailInput.inputValue());
  }

  async fillUserData(email, firstName, lastName) {
    await this.emailInput.fill(email);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }
}
