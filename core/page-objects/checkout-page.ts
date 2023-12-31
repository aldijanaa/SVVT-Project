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
    private city = By.xpath('//input[@id="shippingAddressCity"]');
    private open_country_prompt = By.xpath('//select[@id="shippingCountry"]');
    private choose_country = By.xpath('//option[@data-checkout-url="https://eu.puma.com/hr/en/checkout/start"]');
    private stay_on_german_online_store = By.xpath('//a[@class="btn btn-secondary notification-btn"]');
    private choose_DHL = By.xpath('//input[@id="shippingMethod-DHL-EUR-1"]');
    private enter_email = By.xpath('//input[@id="shippingEmail"]');
    private go_to_payments = By.xpath('//button[@class="checkout-button btn btn-primary btn-block submit-shipping"]');
    //private choose_credit_card = By.xpath('//fieldset[@class="payment-options col-12 "]//div[@class="row payment-option-wrapper js-payment-options"]//label[@class="custom-control custom-radio"]//div[@class="col-6 col-lg-4"]//input[@id="paymentOption-PAYMENTOPERATOR_CREDIT_PAYNOW"]');
    //private choose_credit_card = By.xpath('//div[@class="col-6 col-lg-4"]//input[@id="paymentOption-PAYMENTOPERATOR_CREDIT_PAYNOW"]');
    private choose_credit_card = By.xpath('//span[@class="credit-card-logo mastercard"]');

    private name_on_card = By.xpath('//input[@id="dwfrm_billing_paymentMethods_creditdirect_owner"]');
    private card_number = By.xpath('//input[@id="dwfrm_billing_paymentMethods_creditdirect_number"]')
    private security_code = By.xpath('//input[@id = "dwfrm_billing_paymentMethods_creditdirect_cvn"]');
    private payment_box = By.xpath('//div[@class="card payment-form js-payment-form"]');
    private card_payment_box = By.xpath('//fieldset[@class="payment-options col-12 "]');
    private payments_title = By.xpath('//h4[@class="card-header-title"]');
    private select_payment_method = By.xpath('//button[@class="checkout-button btn btn-primary btn-block submit-payment js-submit-payment"]');
    private choose_expiration_month = By.xpath('//select[@id="dwfrm_billing_paymentMethods_creditdirect_expiration_month"]');
    private choose_october = By.xpath('/html/body/div[5]/div[4]/div/div[1]/div[5]/div[2]/div[4]/div/form/fieldset[1]/fieldset[2]/div/div[5]/div[1]/div/div[1]/div[1]/select/option[11]');
    private choose_expiration_year = By.xpath('//select[@id="dwfrm_billing_paymentMethods_creditdirect_expiration_year"]');
    private choose_2025 = By.xpath('/html/body/div[5]/div[4]/div/div[1]/div[5]/div[2]/div[4]/div/form/fieldset[1]/fieldset[2]/div/div[5]/div[2]/div/div[1]/div[1]/select/option[4]');
    private buy_now_button = By.xpath('//button[@class="checkout-button btn btn-primary btn-block mb-4 klarna-place-order js-klarna-place-order"]');
    private verify_order = By.xpath('//h1[@class="p-page-title"]');
    


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

    async enterCity(){
        await this.fillInputField(this.city, testData.credentials.city);
    }

    async chooseCountry(){
        //await this.driver.sleep(1000);
        await this.driver.manage().setTimeouts({ implicit: 10000 });
        await this.scrollIntoView(this.open_country_prompt);
        await this.findElementAndClick(this.open_country_prompt);
        await this.findElementAndClick(this.choose_country);
    }

    private async scrollIntoView(selector: By) {
        const element = await this.driver.findElement(selector);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    async stayOnGermanOnlineStore(){
        await this.driver.sleep(1000);
        //await this.driver.manage().setTimeouts({ implicit: 10000 });
        await this.findElementAndClick(this.stay_on_german_online_store);
        //await this.driver.sleep(1000);
    }

    async chooseDHLOption(){
        await this.driver.manage().setTimeouts({ implicit: 50000 });
        await this.waitForElement(this.choose_DHL, 10000);
        await this.findElementAndClick(this.choose_DHL);
        //await this.driver.sleep(1000);
        //await this.driver.manage().setTimeouts({ implicit: 50000 });
    }

    async enterEmail(){
        //await this.driver.sleep(1000);
        await this.driver.manage().setTimeouts({ implicit: 50000 });
        await this.waitForElement(this.enter_email, 20000);
        await this.fillInputField(this.enter_email, testData.data.login_email);
    }

    async goToPaymentSection(){
        await this.findElementAndClick(this.go_to_payments);
    }

    async chooseCreditCard(){
        //await this.driver.sleep(1000);
        await this.driver.manage().setTimeouts({ implicit: 10000 });
        await this.scrollIntoView(this.payment_box);
        //await this.driver.sleep(1000);
        await this.findElement(this.payment_box);
        //await this.findElementAndClick(this.payments_title);
        //await this.findElementAndClick(this.select_payment_method);
        //await this.driver.sleep(1000);
        await this.driver.manage().setTimeouts({ implicit: 10000 });
        await this.waitForElement(this.choose_credit_card, 20000);
        await this.findElementAndClick(this.choose_credit_card);
        //await this.driver.sleep(1000);
    }

    //SMOKE TEST pt. 2
    async enterNameOfCreditCard(){
        await this.waitForElement(this.card_payment_box, 50000);
        //await this.driver.sleep(1000);
        await this.waitForElement(this.name_on_card, 2000);
        await this.fillInputField(this.name_on_card, testData.credentials.name_on_card)
    }

    async enterCardNumber(){
        await this.waitForElement(this.card_number, 50000);
        await this.fillInputField(this.card_number, testData.credentials.card_number);
    }

    async enterSecurityCode(){
        await this.waitForElement(this.security_code, 50000);
        await this.fillInputField(this.security_code, testData.credentials.security_code);
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
        await this.scrollIntoView(this.select_payment_method);
        await this.findElementAndClick(this.select_payment_method);
    }

    async clickOnBuyNow(){
        await this.waitForElement(this.buy_now_button, 20000);
        await this.findElementAndClick(this.buy_now_button);
    }

    async verifyOrder(){
        await this.waitForElement(this.verify_order, 50000);
        await this.checkMatchingElements(this.verify_order, testData.verification_message.verify_order);

    }

    
}





