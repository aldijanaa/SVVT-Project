import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { LoginPage } from "../core/page-objects/login-page";

/*HIGHLY IMPORTANT -> Before you run this test, change the number in the email for 
this test in the data.json*/

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: HomePage;
let loginPage: LoginPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    loginPage = new LoginPage(driver);
},10000);

test("user registration", async () => {
    await homePage.acceptAllCookies();
    await homePage.clickOnXButton();
    await homePage.openMenuWithQuickLinks();
    await homePage.clickOnLoginButton();
    await loginPage.provideEmail();
    await loginPage.clickOnRememberLoginCheckbox();
    await loginPage.clickOnContinueWithPasswordButton();
    await loginPage.createAPassword();
    await loginPage.clickOnCreateAnAccountButton();
    await loginPage.verifyAccountCreation();
},500000);

afterAll(async () => {
    await quitDriver(driver);
},30000);

