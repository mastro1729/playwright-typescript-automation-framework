import { Page, expect } from "@playwright/test";

export default class InLoginPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }


    async verifyLoginError() {
        await expect(this.page.getByText("Your email or password is incorrect!")).toBeVisible({ timeout: 2000 });
    }
}