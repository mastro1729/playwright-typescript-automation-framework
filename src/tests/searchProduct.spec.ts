import { test } from "@playwright/test";
import ProductsPage from "../pages/productsPage";
import SearchProductPage from "../pages/searchProduct";
import { readRowAsObject } from "../utils/excelReader";
import { addSystemInfo } from "../utils/testInfoHelper";

test("Search product and verify all results match search keyword", async({page},testInfo) =>{
    addSystemInfo(testInfo);
    const productPage = new ProductsPage(page);
    const searchProductPage = new SearchProductPage(page);
    const searchData = await readRowAsObject("src/testdata/applicationData.xlsx","TC_9",2);
    await productPage.HomePage();
    await productPage.clickProductsLink();
    await productPage.verifyAllProductsPage();
    await searchProductPage.searchProductAndClick(searchData.productName);
    await searchProductPage.verifyAllSearchedProductsContain(searchData.product);


});