import { test } from "@playwright/test";
import LoginPage from "../pages/login";
import InLoginPage from "../pages/inlogin";
import { readRowAsObject } from "../utils/excelReader";
import { addSystemInfo } from "../utils/testInfoHelper";

test("Login User with incorrect credentials", async ({ page }, testInfo) => {
    addSystemInfo(testInfo);
    const loginPage = new LoginPage(page);
    const inloginPage = new InLoginPage(page);
    const data = await readRowAsObject("src/testdata/applicationData.xlsx", "TC_3", 2);
    await loginPage.openLoginPage();
    await loginPage.login(data.signupEmail, data.password);
    await inloginPage.verifyLoginError();

});