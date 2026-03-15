import { test } from "@playwright/test";
import ProductsPage from "../pages/productsPage";
import { addSystemInfo } from "../utils/testInfoHelper";

test("Verify All Products and product detail page", async({page},testInfo) =>{
    addSystemInfo(testInfo);
    const productPage = new ProductsPage(page);
    await productPage.HomePage();
    await productPage.clickProductsLink();
    await productPage.verifyAllProductsPage();
    await productPage.verifyProductListVisible();
    await productPage.clickFirstProduct();
    await productPage.verifyProductDetails();

});