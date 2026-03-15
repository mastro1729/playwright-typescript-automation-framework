import { test } from "@playwright/test";
import TestCasePage from "../pages/testcasePage";
import ContactUsPage from "../pages/contactUs";
import { addSystemInfo } from "../utils/testInfoHelper";


test("Verify Test Case Page", async ({ page },testInfo) => {
    addSystemInfo(testInfo);
    const contactPage = new ContactUsPage(page);
    const testcasePage = new TestCasePage(page);
    await contactPage.launchPage();
    await testcasePage.clickTestcaseButton();
    await testcasePage.verifyTestcasePage();



});