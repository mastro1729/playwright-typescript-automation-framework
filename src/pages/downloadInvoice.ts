import { Page, expect } from "@playwright/test";
import locators from "../locators/downloadInvoice.json";
import * as fs from "fs";

export default class DownloadInvoicePage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async clickToCheckOut() {
        await this.page.locator(locators.proceedToCheckout).click();
    }
    async gotoRegisterAndLogin() {
        await this.page.getByRole("link", { name: "Register / Login" }).click();
    }
    async enterMessageAndclickPlaceOrder(message: string) {
        await this.page.locator(locators.textArea).fill(message);
        await this.page.locator(locators.placeOrder).click();

    }

    async enterPaymentDetails(nameOncard: string, cardNumber: number, cvv: number, expDate: number, year: number) {
        await this.page.locator(locators.nameCard).fill(nameOncard);
        await this.page.locator(locators.cardNumber).fill(String(cardNumber));
        await this.page.locator(locators.cvv).fill(String(cvv));
        await this.page.locator(locators.expDate).fill(String(expDate));
        await this.page.locator(locators.year).fill(String(year));
        await this.page.locator(locators.payConfirm).click();

    }
    async clickDowloadInvoiceAndVerify(downloadPath: string) {
        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.page.locator(locators.downloadInvoice).click(),
        ]);
        const savePath = '${downloadPath}/${download.invoiceFile()}';
        await download.saveAs(savePath);

        if (!fs.existsSync(savePath))
            throw new Error("Invoice not downloaded!");
        return savePath;
    }

}