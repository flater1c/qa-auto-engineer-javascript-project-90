export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: /username/i });
        this.passwordInput = page.getByRole('textbox', { name: /password/i });
        this.signinButton = page.getByRole('button', { name: /sign in/i });
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(email, password) {
        await this.usernameInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signinButton.click();
    }
}