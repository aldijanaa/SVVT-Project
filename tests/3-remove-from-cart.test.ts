import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { ShoeItemPage } from "../core/page-objects/shoe-item-page";
import { ViewCartPage } from "../core/page-objects/view-cart-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let shoeitemPage: ShoeItemPage;
let viewcartPage: ViewCartPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    shoeitemPage = new ShoeItemPage (driver);
    viewcartPage = new ViewCartPage(driver);
},500000);

test("add and remove items from cart", async () => {
    await homePage.acceptAllCookies();
    await homePage.clickOnXButton();
    await homePage.clickOnAShoeItem2();
    await shoeitemPage.clickOnASize2();
    await shoeitemPage.clickOnAddToCart();
    await shoeitemPage.clickToViewCart();
    await viewcartPage.clickToDeleteItemFromCart();
    await viewcartPage.confirmRemoval();
    await viewcartPage.confirmSuccessfulRemoval(); 
    //ovdje mogu potvrditi da je cart empty jer nisam signed in, tako da ce uvijek biti samo ovaj jedan proizvod sto dodam

    
},500000);

afterAll(async () => {
    await quitDriver(driver);
},30000);

