import { Page, expect } from "@playwright/test";
import locators from "../locators/contactUs.json" with { type: "json"}

export default class ContactUsPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async launchPage() {
        await this.page.goto("https://automationexercise.com/", { waitUntil: 'domcontentloaded' });
        expect(this.page.getByRole("link", { name: " Contact us" })).toBeVisible({ timeout: 2000 });
    }
    async clickContactUsLink() {
        await this.page.getByRole("link", { name: " Contact us" }).click();
    }
    async verifyGetInTouchHeader() {
        await expect(this.page.locator(locators.getIntouchHeader)).toBeVisible({ timeout: 2000 });
    }

    async fillForm(name: string, email: string, subject: string, message: string) {
        await this.page.fill(locators.contactName, name);
        await this.page.fill(locators.contactEmail, email);
        await this.page.fill(locators.contactSubject, subject);
        await this.page.fill(locators.contactMessage, message);
    }

    async uploadingFile(filePath: string) {
        await this.page.setInputFiles(locators.uploadFile, filePath);
    }

    async submitForm() {
        this.page.once("dialog", async (dialog) => {
            console.log("Alert Text:", dialog.message());
            await dialog.accept();
        });
        await this.page.click(locators.contactSubmit);

    }
    async verifySuccessMessage() {
        await expect(this.page.locator(locators.alertSuccessStatus)).toHaveText('Success! Your details have been submitted successfully.');

    }
    async returnHome() {
        await this.page.locator(locators.homeButton).click();
        await expect(this.page.getByRole("link", { name: "Signup / Login" })).toBeVisible();
    }
}