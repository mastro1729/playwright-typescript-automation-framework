import { test } from "@playwright/test";
import ProductsPage from "../pages/productsPage";
import AddProductsPage from "../pages/addProductsPage";
import DownloadInvoicePage from "../pages/downloadInvoice";
import LoginPage from "../pages/login";
import { addSystemInfo } from "../utils/testInfoHelper";
import { readRowAsObject } from "../utils/excelReader";

test("Add Products to cart and verify", async ({ page }, testInfo) => {
    addSystemInfo(testInfo)
    const downloadData = await readRowAsObject("src/testdata/applicationData.xlsx","TC_24",2);
    const productPage = new ProductsPage(page);
    const addProductsPage = new AddProductsPage(page);
    const downloadPage = new DownloadInvoicePage(page);
    const logPage = new LoginPage(page);
    await productPage.HomePage();
    await productPage.clickProductsLink();
    await productPage.verifyAllProductsPage();
    await productPage.verifyProductListVisible();
    await addProductsPage.addFirstProductToCart();
   // await addProductsPage.addSecondProductToCart();
    await addProductsPage.gotoCartPage();
    await downloadPage.clickToCheckOut();
    await downloadPage.gotoRegisterAndLogin();
    await logPage.login(downloadData.signupEmail, downloadData.password);
    await logPage.verifyLogin(downloadData.signupName);
    await addProductsPage.gotoCartPage();
    await downloadPage.clickToCheckOut();
    await downloadPage.enterMessageAndclickPlaceOrder(downloadData.messageText);
    await downloadPage.enterPaymentDetails(downloadData.nameOnCard, downloadData.cardNumber, downloadData.cvv, downloadData.expireDate, downloadData.year);
    await downloadPage.clickDowloadInvoiceAndVerify("Downloads");
    await logPage.deleteAccount();




});