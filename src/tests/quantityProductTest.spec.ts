import { test } from "@playwright/test";
import ProductsPage from "../pages/productsPage";
import QuantityProductPage from "../pages/quantityProduct";
import { addSystemInfo } from "../utils/testInfoHelper";

test("Verify Product Quantity in Cart", async({page},testInfo) =>{
    addSystemInfo(testInfo);
    const productPage = new ProductsPage(page);
    const quantityPage = new QuantityProductPage(page);
    await productPage.HomePage();
    await quantityPage.clickViewProduct();
    await quantityPage.increaseQuantityAndAdd(4);
    await quantityPage.gotoCart();
    await quantityPage.verifyQuantity(4);
});