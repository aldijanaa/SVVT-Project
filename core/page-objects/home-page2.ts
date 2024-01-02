//Regression Test 1. Product Search 
import { By, WebDriver, until } from "selenium-webdriver";    //importing webdriver
import BasePage from "./base-page";   //importing BasePage so we can use it's methods 
import { readFileSync } from "fs";   //for reading content of JSON
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");   //providng path to JSON
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));    //reading content of JSON


export class HomePage extends BasePage {
    private searchBar = By.className("p-header-search-field searchInput js-cmp-search-bar-input");  
    private accept_cookies_button = By.id("onetrust-accept-btn-handler");
    private sneakers_item= By.xpath("/html/body/div[5]/div[2]/div/ul/li[3]");  //getting element by full xpath
    //private sneakers_item=By.xpath('//*[@id="product-search-results"]/div[2]/div[3]/div/div[2]/div[1]/div[1]/div/div/div');
    private x_button = By.id("wps-overlay-close-button");

        
    //Constructor: passing instane of WebDriver to parent class (Base-page)
    constructor(driver: WebDriver) {
        super(driver);
    }

    //Method: accept cookies 
    async acceptAllCookies(){
        await this.findElementAndClick(this.accept_cookies_button);
    }

    // Method: if pop-up of discount appears 
    /*async clickOnXButton(){
        await this.findElementAndClick(this.x_button);
    }*/

    //Method: Locate search bar
    async locateSearchBar(){
        await this.findElementAndClick(this.searchBar);
    }

    //Method:Enter in search bar "sneakers"
    async enterInSearchBar(){
        const searchBarElement = await this.findElement(this.searchBar);  //first find the search bar element
        await this.fillInputField(this.searchBar, testData.search_item.item); //then enter "sneakers" in search bar
        // Press Enter key to the search bar
        await searchBarElement.sendKeys('\uE007');  // '\uE007' is the Unicode for the Enter key
    }
    
    //Method: scroll down
    async scrollDown() {
        await this.driver.executeScript('window.scrollBy(0, 300);');  //scroll down by 500 pixels
   }

    //Method: validation that "sneakers" was indeed displayed
    async validationPage(){
        await this.checkMatchingElements(this.sneakers_item, "sneakers");
    }
}