import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";   
import { readFileSync } from "fs";
import * as path from "path"; 

import { CheckFavorites} from "../core/page-objects/add-remove-to-favorites";
import { HomePage } from "../core/page-objects/home-page2";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let checkFavoriteItems: CheckFavorites;
let homePage: HomePage

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);  
    
    homePage = new HomePage(driver);
    checkFavoriteItems = new CheckFavorites(driver);   //object of the class
},20000); 



test("favorite items", async () => {

    //NOTE: because I am using same sneaker item, first remove it and then run the test 
    //Step 1: Accept cookies and cancel promotion
    await homePage.acceptAllCookies();
    await checkFavoriteItems.clickOnXButton();

    //Step 2: In search bar, type in "sneakers"
    await homePage.locateSearchBar();  //locate search bar
    await homePage.enterInSearchBar();
    await homePage.validationPage(); 

    //Step 3: Click on sneakers item, and try to add it to favorites
    await checkFavoriteItems.clickOnSneakers();
    await checkFavoriteItems.scrollDown();
    await checkFavoriteItems.findShoeSize();
    await checkFavoriteItems.chooseShoeSize();
    await checkFavoriteItems.clickOnHeart();

    //Step 4: In order to add to favorites, login
    await checkFavoriteItems.provideLoginEmail();
    await checkFavoriteItems.clickContinueWithPasswordButton();
    
 
    //Step 5: Add to favorites
    await checkFavoriteItems.provideLoginPassword();
    await checkFavoriteItems.clickOnLoginButton();
    await checkFavoriteItems.validationPage();


    //Step 6: Remove from favorites (Regression Test 8)
    await checkFavoriteItems.clickToViewFavorites();
    await checkFavoriteItems.removeFromFavorites();
    await checkFavoriteItems.confirmToRemove();
    await checkFavoriteItems.validationPageFavorites();


 
},50000);



afterAll(async () => {
    await quitDriver(driver);
},20000);  

