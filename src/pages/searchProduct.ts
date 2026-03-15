import { Page, expect } from "@playwright/test";
import locators from "../locators/searchProduct.json";

export default class SearchProductPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async searchProductAndClick(productname: string) {
        await this.page.fill(locators.searchProduct, productname);
        await this.page.locator(locators.searchSubmitButton).click();
    }

    async verifyAllSearchedProductsContain(searchText: string) {
        const productTitles = this.page.locator(locators.productTitles);
        const count = await productTitles.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const rawtitle = await productTitles.nth(i).innerText();
            if(rawtitle)
                continue;
            const title = rawtitle.trim().toLocaleLowerCase();
            expect(title).toContain(searchText.toLowerCase());
        }
    }
}