import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import { createDriver2, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { SneakersPage } from "../core/page-objects/sneakers-page";
import { ShoeItemPage } from "../core/page-objects/shoe-item-page";
import { ViewCartPage } from "../core/page-objects/view-cart-page";
import { CheckoutPage } from "../core/page-objects/checkout-page";

/*const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const chromeOptions = new chrome.Options()*/

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let sneakersPage: SneakersPage;
let shoeitemPage:ShoeItemPage;
let viewcartPage: ViewCartPage;
let checkoutPage : CheckoutPage;

beforeAll(async () => {
    driver = await createDriver2(testData.url.home_page);
    homePage = new HomePage(driver);
    sneakersPage = new SneakersPage(driver);
    shoeitemPage = new ShoeItemPage(driver);
    viewcartPage = new ViewCartPage(driver);
    checkoutPage = new CheckoutPage(driver);
}, 50000);


test("smoke test", async () => {
    await homePage.acceptAllCookies();
    await homePage.clickOnXButton();
    await homePage.hoverOverWomenMenu();
    await homePage.chooseMenuItem();
    await sneakersPage.chooseOneItem();
    await shoeitemPage.changeColorOfSneakers();
    await shoeitemPage.clickToChooseShoeSize();
    await shoeitemPage.clickToChooseQuantity();
    await shoeitemPage.clickOnAddToCart2();
    //await shoeitemPage.closeAddedToCartPrompt(); 
    await shoeitemPage.clickToViewCart();
    await viewcartPage.clickOnCheckoutButton();
    await checkoutPage.enterFirstName();
    await checkoutPage.enterLastName();
    await checkoutPage.enterAddress();
    await checkoutPage.enterHouseNumber();
    await checkoutPage.enterZipCode();
    await checkoutPage.enterCity();

    //aldijana dio
    await checkoutPage.enterEmailOrderInfo();
    await checkoutPage.clickPaymentButton();
    await checkoutPage.chooseCreditCard();
    await checkoutPage.clickOnSelectPayment();

    //enter credit card info
    await checkoutPage.enterNameOfCreditCard();
    await checkoutPage.enterCardNumber();
    await checkoutPage.enterSecurityCode();
    await checkoutPage.chooseExpirationMonth();
    await checkoutPage.chooseExpirationYear();
    await checkoutPage.clickOnSelectPaymentMethod();

    //buy info page
    await checkoutPage.clickBuyButton();
    
},5000000);

afterAll(async () => {
    await quitDriver(driver);
},30000);

