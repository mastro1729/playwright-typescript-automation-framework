import { Page, expect } from "@playwright/test";
import locators from "../locators/login.json";

export default class LoginPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async openLoginPage() {
        await this.page.goto("https://automationexercise.com/");
        await this.page.getByRole("link", { name: "Signup / Login" }).click();
        expect(this.page.getByText("Login to your account")).toBeVisible({ timeout: 2000 });
    }

    async login(email: string, password: string) {
        await this.page.fill(locators.loginUser, email);
        await this.page.fill(locators.passUser, password);
        await this.page.click(locators.loginButton);
    }


    async verifyLogin(username: string) {
        await expect(this.page.locator(`text=Logged in as ${username}`)).toBeVisible({ timeout: 2000 });
    }

    async deleteAccount() {
        await this.page.getByRole("link", { name: "Delete Account" }).click();
        expect(this.page.getByText("Account Deleted!")).toBeVisible({ timeout: 2000 });
    }


}