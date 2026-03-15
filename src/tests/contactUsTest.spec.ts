import { test } from "@playwright/test";
import ContactUsPage from "../pages/contactUs";
import { readRowAsObject } from "../utils/excelReader";
import { addSystemInfo } from "../utils/testInfoHelper";

test("Submit Contact Us From Successfully", async ({ page }, testInfo) => {
    addSystemInfo(testInfo);
    const contactUsPage = new ContactUsPage(page);
    const contactData = await readRowAsObject("src/testdata/applicationData.xlsx", "TC_6", 2);
    await contactUsPage.launchPage();
    await contactUsPage.clickContactUsLink();
    await contactUsPage.verifyGetInTouchHeader();
    await contactUsPage.fillForm(contactData.name!.toString(), contactData.email!.toString(), contactData.subject!.toString(), contactData!.message.toString());
    await contactUsPage.uploadingFile(contactData.filePath!.toString());
    await contactUsPage.submitForm();
    await contactUsPage.verifySuccessMessage();
    await contactUsPage.returnHome();


});