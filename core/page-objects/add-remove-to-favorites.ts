//Regression Test: 6  Add to Favorites
//Regression Test 7: Remove from Favorites

import { By, WebDriver, until } from "selenium-webdriver";    
import BasePage from "./base-page";   
import { readFileSync } from "fs";  
import * as path from "path";



const dataFilePath = path.resolve(__dirname, "../data/data.json");   
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));   

export class CheckFavorites extends BasePage {

    //private sneakersItem = By.xpath('html/body/div[5]/div[5]/div[2]/div[3]/div/div[2]/div[1]/div[1]/div/div/div/div[4]/div[1]/a');
    private sneakersItem = By.xpath('//*[@id="product-search-results"]/div[2]/div[3]/div/div[2]/div[1]/div[1]/div/div/div'); //by x path

    //private shoeSize=By.className("product-variation-swatch-link");      ///product-variation-swatches product-variation--size
    private shoeSize =By.className("product-variation-content ");

    //NOTE ABOUT THIS: this shoe size can change, meaning test can pass one time and then after long time if i run it again it can fail, 
    //because maybe that size is not available no more (so pay attention in mind to laways check whether the side that i am calling on is available)
    private shoeSize2=By.xpath('//*[@id="swatch-0290"]');
  

    private heart = By.className("btn btn-add-to-wish-list-pdp add-to-wish-list");
    //private heart=By.xpath("/html/body/div[6]/div[3]/div[3]/div[2]/div[2]/div/div[11]/div/div[3]/div/button");

    private email_field=By.id("login-form-email");  
    
    //"Continue With Password" button nije htio da radi na x path ovako i na class name, jedino na full x-path
    //private continueWithPassword=By.xpath('//div[@class="row login-bottom-row"]//button[@class="btn btn-block btn-secondary col-12 hf-validated hf-valid hf-in-range hf-user-valid"]');  
    //private continueWithPassword = By.className("btn btn-block btn-secondary col-12 hf-validated hf-valid hf-in-range hf-user-valid");
    private continueWithPassword=By.xpath("/html/body/div[5]/div[3]/div/div[2]/div/div/div/div/div/div[1]/form/div[3]/button[1]");

    private login_password_field = By.id("login-form-password");
    //private locate_login_password_field = By.id("dwfrm_profile_registration_password");


    private validationMessageDisplayed = By.className("wishlist-overlay-item-added ");
   

    private login_button = By.className('btn btn-block btn-secondary col-12');

    private x_button = By.id("wps-overlay-close-button");  //close pop-up 

    /******************************************************************************************************************** */
    //Variables --> Regression Test 8: Remove items from favorites 
    private view_favorites=By.className("btn btn-mongoose wishlist-overlay-action-btn");
    private remove_favorite_button = By.xpath('//*[@id="page"]/div[4]/div[1]/div/div/div/div[1]/div[2]/div[1]/div[2]/div[2]/div/a[2]');
    private confirm_to_remove_button = By.className("btn btn-primary wish-delete-confirmation-btn");
    private validate_empty_favorite_list =By.className("wishlist-empty-message");

    /******************************************************************************************************************** */

    //Constructor: takes WebDriver instance and passes it to its parent class (base-page)
    constructor(driver: WebDriver) {
        super(driver);
    }
  
    //Method: click on sneakers
    async clickOnSneakers(){
        await this.scrollDown();
        await this.findElementAndClick(this.sneakersItem);
    }

    //Method: scroll down
    async scrollDown() {
         await this.driver.executeScript('window.scrollBy(0, 200);');  //scroll down by 500 pixels
    }

    //Method: Locate shoe size section
    async findShoeSize(){
       await this.scrollDown();
       // await this.findElement(this.shoeSize);
        await this.waitForElement(this.shoeSize, 1500);  //in 10 seconds must locate the shoeSize section 
    }

    //Method: choose shoe size
    async chooseShoeSize(){
        await this.findShoeSize();    //calling previous method
        await this.waitAndClick(this.shoeSize2, 1000);    //clicking on 38.5
    }
     

    //Method: Click on heart to view favorite items added
    async clickOnHeart(){
        await this.scrollDown();
        await this.findElement(this.heart);
        await this.waitAndClick(this.heart, 2000);
       
    }
    
    //Method: if pop-up of discount appears 
    async clickOnXButton(){
        await this.findElementAndClick(this.x_button);
    }

    async provideLoginEmail(){
        await this.fillInputField(this.email_field, testData.data.login_email);
    }

    async clickContinueWithPasswordButton(){
        await this.driver.sleep(2000);
        await this.waitAndClick(this.continueWithPassword, 2000);  //prije je bilo findElementAndClick
    }

    /*async findPasswordField(){
        await this.findElement(this.locate_login_password_field);   //ne treba sada?????

    }*/
    async provideLoginPassword(){
        //await this.waitForElement(this.login_password_field, 2000);
        await this.fillInputField(this.login_password_field, testData.credentials.login_password);  //providing data from json
    }

    async clickOnLoginButton(){
        await this.findElementAndClick(this.login_button);
    }
       
    //Method: vertification message
    async validationPage(){
        //await this.waitForElement(this.validationMessageDisplayed,2000);
        await this.waitAndClick(this.validationMessageDisplayed,2000);
        await this.checkMatchingElements(this.validationMessageDisplayed, "Added to Favourites");
    }

    //Method: View favorites
    async clickToViewFavorites(){
        await this.findElementAndClick(this.view_favorites);
    }

    /*********************************************************************************************************************** */
    //Methods: remove from favorites
    async removeFromFavorites(){
        await this.findElementAndClick(this.remove_favorite_button);  //click on "trash bin" button
    }

    async confirmToRemove(){
        await this.findElementAndClick(this.confirm_to_remove_button);  //click "Yes,remove" buttpn
    }

    async validationPageFavorites(){
        await this.waitForElement(this.validate_empty_favorite_list,2000);   //prompt displayed 
        await this.checkMatchingElements(this.validate_empty_favorite_list, "Your Favourites list is Empty");   //because we only had 1 item in the cart
    }
    /************************************************************************************************* */


    
  
  


} 
