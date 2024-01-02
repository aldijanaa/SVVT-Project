//Regression Test 9: View return policy
import { By, WebDriver, until } from "selenium-webdriver";    //importing webdriver
import BasePage from "./base-page";   //importing BasePage so we can use it's methods 
import { readFileSync } from "fs";   //for reading content of JSON
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");   //providng path to JSON
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));    //reading content of JSON




export class ViewReturnPolicy extends BasePage {

    private footer=By.className("p-footer");
    private return_policy_link = By.partialLinkText("Return Policy");
    private vertification_message = By.partialLinkText("by phone"); 




    //Method: Scroll to the bottom of the page
    async scrollToBottomOfPage(){
        
        //await this.driver.executeScript('window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });');  ne radi
        await this.driver.executeScript('window.scrollTo(0, 5000);');  //scroll down by 500 pixels
        await this.driver.sleep(1000);  //  delay of 1 second ( to make sure nothing else is going on)
        await this.waitForElement(this.footer, 2000);
    }

    //Method: Click on Return Policy
    async clickOnReturnPolicyMenu(){
        await this.findElementAndClick(this.return_policy_link);
    }

    //Method: vertification that return policy was indeed displayed
    async vertificationPage(){
        await this.waitForElement(this.vertification_message,2000);  
        await this.checkMatchingElements(this.vertification_message, "by phone");

    }







}
