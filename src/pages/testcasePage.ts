import { Page, expect } from "@playwright/test";
import locators from "../locators/testcasePage.json"

export default class TestCasePage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async clickTestcaseButton(){
        await this.page.locator(locators.testcaseButton).click();
    }
    async verifyTestcasePage(){
        await expect(this.page.locator(locators.header)).toHaveText("Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:");
    }
}