import { Page, expect } from "@playwright/test";
import locators from "../locators/addproducts.json";

export default class AddProductsPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async addFirstProductToCart() {
        //await this.page.locator(locators.allProducts).first().scrollIntoViewIfNeeded();
        const product = this.page.locator(locators.productCard).first();
        await product.scrollIntoViewIfNeeded();
        await product.hover();
        const overlay = product.locator(locators.allProducts).first();
        await overlay.waitFor({state: "visible"});
        await this.page.locator(locators.firstAddToCart).first().click();
        await this.page.getByRole("button", { name: "Continue Shopping" }).click();
    }
    async addSecondProductToCart() {
        await this.page.locator(locators.allProducts).nth(1).hover();
        await this.page.locator(locators.secondAddToCart).click();
        await this.page.getByRole("button", { name: "Continue Shopping" }).click();
    }
    async gotoCartPage() {
        await this.page.getByRole("link", { name: "Cart" }).click();
        await expect(this.page.locator(locators.cartInfo)).toBeVisible({ timeout: 2000 });
    }
    async verifyProductsAdded() {
        const productsRow = this.page.locator(locators.productsRows);
        await expect(productsRow).toHaveCount(2);
        await expect(this.page.locator(locators.priceRows)).toHaveCount(2);
        await expect(this.page.locator(locators.quanityRows)).toHaveCount(2);
        await expect(this.page.locator(locators.totalCartRows)).toHaveCount(2);

    }
}