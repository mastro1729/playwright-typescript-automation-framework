import { Page, expect } from "@playwright/test";
import locators from "../locators/subscriptionHomePage.json";

export default class SubscriptionHomePage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async scrollToFooter() {
        await this.page.locator(locators.footer).scrollIntoViewIfNeeded();
    }
    async verifySubscriptionText() {
        await expect(this.page.getByText("Subscription")).toBeVisible({ timeout: 2000 });
    }
    async enterEmailAndSubscribe(email: string) {
        await this.page.fill(locators.searchSubscription, email);
        await this.page.click(locators.arrowButton);
    }
    async verifySuccessMessage() {
        this.page.once("dialog", async (dialog) => {
            console.log("Alert Text:", dialog.message());
            const successMsg = dialog.message();
            expect(successMsg).toBeTruthy();

        });
    }
}