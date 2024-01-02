import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";   
import { readFileSync } from "fs";
import * as path from "path"; 

import { CheckFavorites} from "../core/page-objects/add-remove-to-favorites";
import { HomePage } from "../core/page-objects/home-page2";
import { ViewReturnPolicy } from "../core/page-objects/view-return-policy";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let checkFavoriteItems: CheckFavorites;
let homePage: HomePage
let returnPolicy: ViewReturnPolicy;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);  
    
    homePage = new HomePage(driver);
    checkFavoriteItems = new CheckFavorites(driver);   
    returnPolicy = new ViewReturnPolicy(driver);

},20000);  


test("view return policy", async () => {

    await homePage.acceptAllCookies();
    //await checkFavoriteItems.clickOnXButton();  //if needed

    await returnPolicy.scrollToBottomOfPage();
    await returnPolicy.clickOnReturnPolicyMenu();
    await returnPolicy.vertificationPage();



},40000);













afterAll(async () => {
    await quitDriver(driver);
},20000); 
