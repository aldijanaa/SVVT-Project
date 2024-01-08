import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";   
import { readFileSync } from "fs";
import * as path from "path"; 

import { HomePage } from "../core/page-objects/home-page2";

//NOTE: everything starts from home-page

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;  //ovo je predhodni productSearch


beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);  //calling driver in this
    homePage = new HomePage(driver);   //object of the class
},10000);  //10 seconds for the driver to open


//Regression Test 1. Product Search
test("product search", async () => {
    await homePage.acceptAllCookies();
    //await homePage.clickOnXButton();   //discount pop-up (not showed)

    await homePage.locateSearchBar();  //locate search bar
    await homePage.enterInSearchBar();   //enter "sneakers" in search bar
    await homePage.scrollDown();    //scroll down so we can see nicely products displayed
    await homePage.validationPage();   //validate that correct page is displayed
},10000);


afterAll(async () => {
    await quitDriver(driver);
},20000);  //20 seconds for the driver to close

