import { Page, chromium, expect } from "@playwright/test";
import locators from "../locators/registration.json" with { type: "json"};

export default class RegistrationPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async openSignup() {
        const browser = await chromium.launch();
        const context = await browser.newContext(); // Incognito mode
        const page = await context.newPage();

        await this.page.goto("http://automationexercise.com");
        await this.page.getByRole("link", { name: "Signup / Login" }).click();
        expect(this.page.getByText("New User Signup!")).toBeVisible({ timeout: 2000 });
    }

    async enterSignupDetails(name: string, email: string) {
        await this.page.locator(locators.signupNameField).fill(name);
        await this.page.locator(locators.signupEmailField).fill(email);
        await this.page.locator(locators.signupButton).click();
    }

    async fillAccountDetails(data: any) {

        //Title Selection
        if (data.title.toLowerCase() === "mr") {
            await this.page.check(locators.titleMr)
        } else {
            await this.page.check(locators.titleMrs);
        }
        //Basic details

        await this.page.fill(locators.passwordField, data.password.toString());
        //DOB Dropdowns

        await this.page.selectOption(locators.dayDropdown, data.day.toString());
        await this.page.selectOption(locators.monthDropdown, data.month.toString());
        await this.page.selectOption(locators.yearDropdown, data.year.toString());
        //Checkboxes

        if (data.newsletter.toString().toLowerCase() === "true") {
            await this.page.check(locators.newsletterCheckbox);
        }
        if (data.splOffers.toString().toLowerCase() === "true") {
            await this.page.check(locators.specialOffersCheckbox);
        }

        //Address Section

        await this.page.fill(locators.firstName, data.firstName);
        await this.page.fill(locators.lastName, data.lastName);
        await this.page.fill(locators.companyName, data.company);
        await this.page.fill(locators.address1, data.address1);
        await this.page.fill(locators.address2, data.address2);

        // Country dropdown

        await this.page.selectOption(locators.countryDropdown, data.country);
        await this.page.fill(locators.state, data.state);
        await this.page.fill(locators.city, data.city);
        await this.page.fill(locators.zipcode, data.zipcode.toString());
        await this.page.fill(locators.mobileNumber, data.mobileNumber.toString());

    }

    async submitAndVerify() {
        await this.page.click(locators.createAccount);
        await expect(this.page.getByText("Account Created!")).toBeVisible({ timeout: 2000 });
    }

}