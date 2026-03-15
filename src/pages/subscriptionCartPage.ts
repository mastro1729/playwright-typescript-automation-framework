import { Page, expect } from "@playwright/test";
;

export default class SubscriptionCartPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async clcikCartPage(){
         await this.page.goto("https://automationexercise.com/", { waitUntil: 'domcontentloaded' });
        expect(this.page.getByRole("link", { name: "Cart" })).toBeVisible({ timeout: 2000 });
    }
}