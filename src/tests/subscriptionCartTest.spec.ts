import { test } from "@playwright/test";
import ProductsPage from "../pages/productsPage";
import SubscriptionHomePage from "../pages/subscriptionHomePage";
import SubscriptionCartPage from "../pages/subscriptionCartPage";
import { readRowAsObject } from "../utils/excelReader";
import { addSystemInfo } from "../utils/testInfoHelper";

test("Verify subscription email successfully in Cart page", async ({ page },testInfo) => {
    addSystemInfo(testInfo);
    const subCartPage = new SubscriptionCartPage(page);
    const subHomePage = new SubscriptionHomePage(page);
    const subCartData = await readRowAsObject("src/testdata/applicationData.xlsx", "TC_11", 2);
    await subCartPage.clcikCartPage();
    await subHomePage.scrollToFooter();
    await subHomePage.verifySubscriptionText();
    await subHomePage.enterEmailAndSubscribe(subCartData.email);
    await subHomePage.verifySuccessMessage();


});