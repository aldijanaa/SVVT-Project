import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";   
import { readFileSync } from "fs";
import * as path from "path"; 

import { CheckFavorites} from "../core/page-objects/add-remove-to-favorites";
import { HomePage } from "../core/page-objects/home-page2";
import { ViewReturnPolicy } from "../core/page-objects/view-return-policy";
import { SizeGuide } from "../core/page-objects/size-guide";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;

let checkFavoriteItems: CheckFavorites;
let homePage: HomePage;
let returnPolicy: ViewReturnPolicy;
let sizeGuide: SizeGuide;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);  
    
    homePage = new HomePage(driver);
    checkFavoriteItems = new CheckFavorites(driver);  
    returnPolicy = new ViewReturnPolicy(driver);
    sizeGuide = new SizeGuide(driver);

},20000);  


test("view size guide", async () => {
    await homePage.acceptAllCookies();

    await sizeGuide.clickOnMenuButton();
    
   // await checkFavoriteItems.scrollDown();

    await sizeGuide.scrollDown();
    await sizeGuide.clickOnSneakers();
    await sizeGuide.sizeButtonClick();
 


},20000);














afterAll(async () => {
    await quitDriver(driver);
},20000);  
