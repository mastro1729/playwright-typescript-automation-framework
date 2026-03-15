import { test } from "@playwright/test";
import RegistrationPage from "../pages/registrationPage";
import { readRowAsObject } from "../utils/excelReader";
import { addSystemInfo } from "../utils/testInfoHelper";

test("Verify Registration from Excel", async ({ page },testInfo) => {
    await addSystemInfo(testInfo);
    const reg = new RegistrationPage(page);
    const data = await readRowAsObject("src/testdata/applicationData.xlsx", "TC_1", 2);

    await reg.openSignup();
    await reg.enterSignupDetails(data.signupName, data.signupEmail);
    await reg.fillAccountDetails(data);
    await reg.submitAndVerify();

})