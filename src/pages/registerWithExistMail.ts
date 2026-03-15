import { Page, expect } from "@playwright/test";


export default class RegisterWithExistMailPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async verifyLoginError() {
        await expect(this.page.getByText("Email Address already exist!")).toBeVisible({ timeout: 2000 });
    }
}