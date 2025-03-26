export class DashboardPage {
    constructor(page) {
        //this.page = page;
        this.profileButton = page.getByRole('button', {name: /Profile/i});
        this.logoutButton = page.getByRole('menuitem', {name: /Logout/i});
    }

    async logout() {
        await this.profileButton.click();
        await this.logoutButton.click();
    }
}