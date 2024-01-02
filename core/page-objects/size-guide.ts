//Regression Test 10: Size guide
import { By, WebDriver, until } from "selenium-webdriver";    
import BasePage from "./base-page";   
import { readFileSync } from "fs";  
import * as path from "path";



const dataFilePath = path.resolve(__dirname, "../data/data.json");   
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));   

export class SizeGuide extends BasePage {
    private fenty_menu_item = By.xpath('//*[@id="siteHeader"]/div[1]/div/div[2]/div/div[1]/div[2]/nav/ul/li[4]/a');
    private sneakers_item = By.xpath('//*[@id="product-search-results"]/div[2]/div[4]/div/div[3]/div[1]/div[3]/div/div/div'); 
    
    //private size_guide_item = By.className("product-variation-btn size-chart-button");
   // private size_guide_item = By.xpath('//*[@id="attributes-container-size"]/div[1]/button');

   // private size_guide_item=By.xpath('//*[@id="attributes-container-size"]/div[1]/button/svg');
    private size_guide_item=By.partialLinkText("Size Guide");


    //Constructor: takes WebDriver instance and passes it to its parent class (base-page)
    constructor(driver: WebDriver) {
        super(driver);
    }

    //Method: click on "FENTYxPUMA" menu button
    async clickOnMenuButton(){
        await this.findElementAndClick(this.fenty_menu_item);
    }
    
    //Method: scroll down
    async scrollDown() {
        await this.driver.executeScript('window.scrollBy(0, 700);');  //scroll down by 500 pixels
   }

   //Method: click on sneakers
    async clickOnSneakers(){
        await this.findElementAndClick(this.sneakers_item);
    }

     
    /*async sizeButtonClick() {
        // Scroll down again
        /*await this.scrollDown();
        await this.driver.sleep(2000);

        // Scroll down further
        await this.scrollDown();
        await this.driver.sleep(2000);*/

        /*await this.driver.executeScript('window.scrollBy(0, 700);');
    
  
        const sizeGuideElement = await this.waitForElement(this.size_guide_item, 5000);
        await this.driver.executeScript('window.scrollBy(0, 400);');


        // Click on the size guide item using executeScript
        await this.driver.executeScript("arguments[0].click();", sizeGuideElement);*/


        /*const sizeGuideElement = await this.waitForElementVisible(this.size_guide_item, 5000);
        await this.driver.executeScript('arguments[0].scrollIntoView();', sizeGuideElement);
        await this.clickButton(this.size_guide_item);


    }*/

    async sizeButtonClick() {
        // Scroll down a bit
        await this.scrollDown();
        await this.driver.sleep(2000);
        await this.scrollDown();
        await this.driver.executeScript('window.scrollBy(0, 400);');
    
        // Wait for the size guide item to be clickable
        const sizeGuideElement = await this.waitForElementVisible(this.size_guide_item, 5000);
    
    
        await this.driver.executeScript("arguments[0].click();", sizeGuideElement);

        
    
        // Click on the size guide item
        //await this.findElementAndClick(this.sizeGuideElement);
    }
    


  

}