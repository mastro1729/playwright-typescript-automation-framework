import { test } from "@playwright/test";
import RegistrationPage from "../pages/registrationPage";
import RegisterWithExistMailPage from "../pages/registerWithExistMail";
import { readRowAsObject } from "../utils/excelReader";
import { addSystemInfo } from "../utils/testInfoHelper";

test("User signup with exist email", async ({ page },testInfo) => {
    addSystemInfo(testInfo);
    const reg = new RegistrationPage(page);
    const existreg = new RegisterWithExistMailPage(page);

    const existData = await readRowAsObject("src/testdata/applicationData.xlsx", "TC_5", 2);
    await reg.openSignup();
    await reg.enterSignupDetails(existData.signupName, existData.signupEmail);
    await existreg.verifyLoginError();
    

})