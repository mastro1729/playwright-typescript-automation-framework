import { test } from "@playwright/test";
import LoginPage from "../pages/login";
import LogoutPage from "../pages/logout";
import { readRowAsObject } from "../utils/excelReader";
import { addSystemInfo } from "../utils/testInfoHelper";

test("Logout the application", async ({ page },testInfo) => {
    addSystemInfo(testInfo);
    const loginPage = new LoginPage(page);
    const logoutPage = new LogoutPage(page);
    const data = await readRowAsObject("src/testdata/applicationData.xlsx", "TC_4", 2);
    await loginPage.openLoginPage();
    await page.waitForTimeout(3000);
    await loginPage.login(data.signupEmail, data.password);
    await page.waitForTimeout(3000);
    await loginPage.verifyLogin(data.signupName);
    await page.waitForTimeout(3000);
    await logoutPage.logout();

});