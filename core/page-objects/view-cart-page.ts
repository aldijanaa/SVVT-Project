import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ViewCartPage extends BasePage {

    //TEST 3
    private trash_bin_button = By.xpath("//div[@class='d-none d-sm-block']//div[@class='btn-underline edit-add-to-wishlist']//a[@class='remove-product']");
    private confirm_removal_button = By.xpath("//button[@class='btn btn-primary cart-delete-confirmation-btn']");
    private confirm_successful_removal = By.xpath("//h1[@class='cart-empty-message text-center']");

    //SMOKE TEST
    private checkout_button = By.xpath('//a[@class="btn btn-primary js-checkout-btn checkout-btn col-12 "]');

    constructor(driver: WebDriver) {
        super(driver);
    }
    //TEST 3
    async clickToDeleteItemFromCart(){
        //await this.driver.sleep(1000);
        await this.driver.manage().setTimeouts({ implicit: 10000 });
        await this.findElementAndClick(this.trash_bin_button);
    }

    async confirmRemoval(){
        //await this.driver.sleep(1000);
        await this.findElementAndClick(this.confirm_removal_button);
    }

    async confirmSuccessfulRemoval(){
        await this.findElementAndClick(this.confirm_successful_removal);
    }

    //SMOKE TEST
    async clickOnCheckoutButton(){
        await this.findElementAndClick(this.checkout_button);
    }


   
}

