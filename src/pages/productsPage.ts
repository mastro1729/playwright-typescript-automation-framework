import { Page, expect } from "@playwright/test";
import locators from "../locators/products.json";

export default class ProductsPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async HomePage() {
        await this.page.goto("https://automationexercise.com/", { waitUntil: 'domcontentloaded' });
        expect(this.page.getByRole("link", { name: " Products" })).toBeVisible({ timeout: 2000 });
    }

    async clickProductsLink() {
        await this.page.getByRole("link", { name: "Products" }).click();
    }
    async verifyAllProductsPage() {
        await expect(this.page.getByText("All Products")).toBeVisible({ timeout: 2000 });
    }
    async verifyProductListVisible() {
        const count = await this.page.locator(locators.productLists).count();
        expect(count).toBeGreaterThan(0);

    }

    async clickFirstProduct() {
        await this.page.locator(locators.productLists).first().locator("text=View Product").click();
    }

    async verifyProductDetails(){
        await expect(this.page.locator(locators.productName)).toBeVisible();
        await expect(this.page.locator("h2:has-text('Category')")).toBeVisible();
        await expect(this.page.locator(locators.price)).toBeVisible();
        await expect(this.page.locator("b:has-text('Availability:')")).toBeVisible();
        await expect(this.page.locator("b:has-text('Condition:')")).toBeVisible();
        await expect(this.page.locator("b:has-text('Brand:')")).toBeVisible();

    }

}