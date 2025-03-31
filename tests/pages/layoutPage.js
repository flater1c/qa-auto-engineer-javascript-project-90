export class LayoutPage {
    constructor(page) {
        //this.page = page;
        this.profileButton = page.getByRole('button', { name: /Profile/i });
        this.usersButton = page.getByRole('menuitem', { name: /Users/i });
        this.taskStatusesButton = page.getByRole('menuitem', { name: /Task Statuses/i });
        this.labelsButton = page.getByRole('menuitem', { name: /Labels/i });
        this.tasksButton = page.getByRole('menuitem', { name: /Tasks/i });
        this.logoutButton = page.getByRole('menuitem', { name: /Logout/i });
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