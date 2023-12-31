import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class LoginPage extends BasePage {

    //variables for TESTS 2 - 6
    //TEST 5
    private email_field = By.id('login-form-email');
    private remember_login_checkbox = By.id('loginRememberMe');
    private password_button = By.className('btn btn-block btn-secondary col-12');
    private locate_form = By.className("registration");
    private create_password_field = By.id('dwfrm_profile_registration_password');
    private create_account_button = By.className('row login-bottom-row');
    private verification_message = By.className('modal-nsj-title');

    //TEST 6
    private login_password_field = By.id("login-form-password");
    private login_button = By.className('btn btn-block btn-secondary col-12');
    private login_verification_message = By.className('breadcrumb-item');

    constructor(driver: WebDriver) {
        super(driver);
    }

 
    //Test 5
    async provideEmail(){
        await this.fillInputField(this.email_field, testData.data.email);
    }

    async clickOnRememberLoginCheckbox(){
        await this.findElementAndClick(this.remember_login_checkbox);
    }

    async clickOnContinueWithPasswordButton(){
        await this.findElementAndClick(this.password_button);
    }

    async createAPassword(){
        await this.waitForElement(this.locate_form, 20000);
        await this.fillInputField(this.create_password_field, testData.credentials.login_password);
    }

    async clickOnCreateAnAccountButton(){
        await this.findElementAndClick(this.create_account_button);
    }

    async verifyAccountCreation(){
        await this.waitForElement(this.verification_message, 10000);
        await this.checkMatchingElements(this.verification_message, testData.verification_message.registration_message);
    }

    //TEST 6
    async provideLoginEmail(){
        await this.fillInputField(this.email_field, testData.data.login_email);
    }

    async provideLoginPassword(){
        await this.fillInputField(this.login_password_field, testData.credentials.login_password);
    }

    async clickOnLoginButton(){
        await this.findElementAndClick(this.login_button);
    }

    async verifyAccountLogin(){
        await this.waitForElement(this.login_verification_message, 10000);
        const elements = await this.findElement(this.login_verification_message);

        if (elements.length >= 2) {
        const secondElementText = await elements[1].getText();
        
        await this.checkMatchingElements(secondElementText, testData.verification_message.login_message);
    }
}

   
}
