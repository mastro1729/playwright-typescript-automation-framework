import { test } from "@playwright/test";
import ProductsPage from "../pages/productsPage";
import SubscriptionHomePage from "../pages/subscriptionHomePage";
import { readRowAsObject } from "../utils/excelReader";
import { addSystemInfo } from "../utils/testInfoHelper";

test("Verify subscription email successfully in Home page", async ({ page },testInfo) => {
    addSystemInfo(testInfo);
    const productPage = new ProductsPage(page);
    const subHomePage = new SubscriptionHomePage(page);
    const subscriptionData = await readRowAsObject("src/testdata/applicationData.xlsx", "TC_10", 2);
    await productPage.HomePage();
    await page.waitForTimeout(3000);
    await subHomePage.scrollToFooter();
    await page.waitForTimeout(3000);
    await subHomePage.verifySubscriptionText();
    await page.waitForTimeout(3000);
    await subHomePage.enterEmailAndSubscribe(subscriptionData.email);
    await page.waitForTimeout(3000);
    await subHomePage.verifySuccessMessage();
    await page.waitForTimeout(3000);


});