import { Page, expect } from "@playwright/test";
import locators from "../locators/quantityProduct.json";


export default class QuantityProductPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async clickViewProduct() {
        await this.page.locator(locators.viewProduct).click();
        await expect(this.page.locator(locators.productInfo)).toBeVisible({ timeout: 2000 });
    }
    async increaseQuantityAndAdd(count: number) {
        const inputQuantity = this.page.locator(locators.quantity);
        await inputQuantity.fill("");
        await inputQuantity.type(count.toString());
        await this.page.locator(locators.addToCart_Quantity).click();
    }
    async gotoCart() {
        await this.page.getByRole("link", { name: "View Cart" }).click();
    }

    async verifyQuantity(count: number){
      const qunatityValues = await this.page.locator(locators.quantityValue).innerText();
      expect(qunatityValues.trim()).toBe(count.toString());
    }
}