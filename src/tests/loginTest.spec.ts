import { test } from "@playwright/test";
import LoginPage from "../pages/login";
import { readRowAsObject } from "../utils/excelReader";
import { addSystemInfo } from "../utils/testInfoHelper";

test("Login User with correct credentials", async({page},testInfo) =>{
    addSystemInfo(testInfo);
    const loginPage = new LoginPage(page);
    const data = await readRowAsObject("src/testdata/applicationData.xlsx","TC_2",2);
    await loginPage.openLoginPage();
    await loginPage.login(data.signupEmail, data.password);
    await loginPage.verifyLogin(data.signupName);
    await loginPage.deleteAccount();
});