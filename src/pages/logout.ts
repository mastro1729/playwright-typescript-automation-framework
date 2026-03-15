import { Page, expect } from "@playwright/test";

export default class LogoutPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }


    async logout() {
       await this.page.getByRole("link",{name: "Logout"}).click();
       expect(this.page.getByRole("link",{name: "Signup / Login"})).toBeVisible({timeout: 2000});
       expect(this.page.getByText("Login to your account")).toBeVisible({timeout: 2000});
    }
}