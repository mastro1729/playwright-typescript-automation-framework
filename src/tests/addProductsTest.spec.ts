import { test } from "@playwright/test";
import ProductsPage from "../pages/productsPage";
import AddProductsPage from "../pages/addProductsPage";
import { addSystemInfo } from "../utils/testInfoHelper";

test("Add Products to cart and verify", async ({ page }, testInfo) => {
    addSystemInfo(testInfo)
    const productPage = new ProductsPage(page);
    const addProductsPage = new AddProductsPage(page);
    await productPage.HomePage();
    await page.waitForTimeout(3000);
    await productPage.clickProductsLink();
    await page.waitForTimeout(3000);
    await productPage.verifyAllProductsPage();
    await page.waitForTimeout(3000);
    await productPage.verifyProductListVisible();
    await page.waitForTimeout(3000);
    await addProductsPage.addFirstProductToCart();
    await page.waitForTimeout(3000);
    await addProductsPage.addSecondProductToCart();
    await page.waitForTimeout(3000);
    await addProductsPage.gotoCartPage();
    await page.waitForTimeout(3000);
    await addProductsPage.verifyProductsAdded();

});