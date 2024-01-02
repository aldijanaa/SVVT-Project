import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class CheckoutPage extends BasePage {
 
    //Smoke test 
    private shipping_first_name = By.xpath("//input[@id='shippingFirstName']");
    private shipping_lastname = By.xpath("//input[@id='shippingLastName']");
    private shipping_address = By.xpath("//input[@id='shippingAddressOne']")
    private house_number = By.xpath("//input[@id ='shippingSuite']");
    private zip_code = By.xpath('//input[@id="shippingZipCode"]');

    private city = By.id("shippingAddressCity");

    //Payment section
    private enter_email = By.id("shippingEmail");
    private go_to_payment_button =By.className("checkout-button btn btn-primary btn-block submit-shipping");
    private select_payment_button = By.xpath('//*[@id="dwfrm_billing"]/div[2]/div/button[1]');
    private credit_card_button = By.xpath('//*[@id="dwfrm_billing"]/fieldset[1]/div[4]/div/label/div[1]');

    //Enter credit card info
    private name_on_card = By.xpath('//input[@id="dwfrm_billing_paymentMethods_creditdirect_owner"]');
    private card_number = By.xpath('//input[@id="dwfrm_billing_paymentMethods_creditdirect_number"]')
    private security_code = By.xpath('//input[@id = "dwfrm_billing_paymentMethods_creditdirect_cvn"]');
    private choose_expiration_month = By.xpath('//select[@id="dwfrm_billing_paymentMethods_creditdirect_expiration_month"]');
    private choose_october = By.xpath('/html/body/div[5]/div[4]/div/div[1]/div[5]/div[2]/div[4]/div/form/fieldset[1]/fieldset[2]/div/div[5]/div[1]/div/div[1]/div[1]/select/option[11]');

    private choose_expiration_year = By.xpath('//select[@id="dwfrm_billing_paymentMethods_creditdirect_expiration_year"]');
    private choose_2025 = By.xpath('/html/body/div[5]/div[4]/div/div[1]/div[5]/div[2]/div[4]/div/form/fieldset[1]/fieldset[2]/div/div[5]/div[2]/div/div[1]/div[1]/select/option[4]');
    
    private select_payment_method = By.xpath('//*[@id="dwfrm_billing"]/div[2]/div');

    private buy_button = By.className("checkout-button btn btn-primary btn-block mb-4 klarna-place-order js-klarna-place-order");


    constructor(driver: WebDriver) {
        super(driver);
    }
    
    async enterFirstName(){
        await this.fillInputField(this.shipping_first_name, testData.credentials.shipping_first_name);
    }

    async enterLastName(){
        await this.fillInputField(this.shipping_lastname, testData.credentials.shipping_lastname);
    }

    async enterAddress(){
        await this.fillInputField(this.shipping_address, testData.credentials.shipping_address);
    }

    async enterHouseNumber(){
        await this.fillInputField(this.house_number, testData.credentials.house_number);
    }

    async enterZipCode(){
        await this.fillInputField(this.zip_code, testData.credentials.zip_code)
    }
    //aldijana
    async enterCity(){
        await this.fillInputField(this.city, testData.credentials.city);
    }

    
    //Smoke test part 2 - aldijana
    async enterEmailOrderInfo(){
        await this.fillInputField(this.enter_email, testData.data.email);
    }

    async clickPaymentButton(){
        await this.findElementAndClick(this.go_to_payment_button);
    }

    async chooseCreditCard(){
        await this.waitForElement(this.credit_card_button, 5000);
        await this.findElementAndClick(this.credit_card_button);
    }

    async clickOnSelectPayment(){
        await this.waitAndClick(this.select_payment_button, 5000);

    }

    //Enter credit card info
      async enterNameOfCreditCard(){
        await this.waitForElement(this.name_on_card, 20000);
        await this.fillInputField(this.name_on_card, testData.credit_card_info.name)
    }

    async enterCardNumber(){
        await this.waitForElement(this.card_number, 50000);
        await this.fillInputField(this.card_number, testData.credit_card_info.card_number);
    }

    async enterSecurityCode(){
        await this.waitForElement(this.security_code, 50000);
        await this.fillInputField(this.security_code, testData.credit_card_info.security_code);
    }

    async chooseExpirationMonth(){
        await this.findElementAndClick(this.choose_expiration_month);
        await this.waitForElement(this.choose_october, 20000);
        await this.findElementAndClick(this.choose_october);
    }

    async chooseExpirationYear(){
        await this.findElementAndClick(this.choose_expiration_year);
        await this.waitForElement(this.choose_2025, 20000);
        await this.findElementAndClick(this.choose_2025);
    }

    async clickOnSelectPaymentMethod(){
        //await this.scrollIntoView(this.select_payment_method);
        await this.findElementAndClick(this.select_payment_method);
    }

    //click on BUy now button
    async clickBuyButton(){
        await this.waitForElement(this.buy_button, 5000);
        await this.findElementAndClick(this.buy_button);
    }
    //Currently unable to show "Thank you message"  (fake credit card info )



    
    
}





