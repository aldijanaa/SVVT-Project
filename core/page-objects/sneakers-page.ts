import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class SneakersPage extends BasePage {

    //TEST 4
    private locate_filters_menu = By.xpath('//div[@class="refinement-bar-container js-refinement-bar-container"]');
    private click_on_price_field = By.xpath("//button[@class='btn refinement-title ']");
    private open_price_field =  By.xpath("//div[@class='refinement refinement--product_price_de is-open']//div[@class='refinement-show']");
    private close_price_filter = By.xpath("//div[@class='refinement refinement--product_price_de is-open']//div[@class='refinement-show']//button[@class='btn refinement-icon-close hidden-md-down']");
    private show_all_items = By.xpath("//button[@class='btn btn-primary show-all-button col-12 col-sm-4 col-md-2 ml-sm-2 ']");
    private standard_price = By.className("product-tile-price-standard product-tile__price--standard");
    private discounted_price = By.className("product-tile-price-new product-tile__price--new");
    private all_products = By.xpath("//div[@class='product-grid-container']");
    private confirm_filtration = By.xpath("//span[@class='filter-bar-value']");
    private click_on_size_filter = By.xpath("//div[@class='refinement refinement--size_facet']//button[@class='btn refinement-title ']");
    private choose_price = By.xpath('/html/body/div[5]/div[6]/div[2]/div[2]/div/div/div[1]/div[2]/div[1]/div[2]/div/ul/li[3]/button/div/label/input');
    private choose_size = By.xpath('/html/body/div[5]/div[6]/div[2]/div[2]/div/div/div[1]/div[2]/div[1]/div[3]/div/ul/li[5]/button/div/label/input');
    private close_size_prompt = By.xpath("//div[@class='refinement refinement--size_facet is-open']//div[@class='refinement-show']//button[@class='btn refinement-icon-close hidden-md-down']");
    private confirm_size_filtration = By.xpath("//span[@class='filter-bar-value']");
    private open_colour_button = By.xpath("//div[@class='refinement refinement--refinement_color']//button[@class='btn refinement-title ']");
    private open_colour_button_smoke_test = By.xpath("//button[@class='btn refinement-title ']")
    private choose_colour = By.xpath('/html/body/div[5]/div[6]/div[2]/div[2]/div/div/div[1]/div[2]/div[1]/div[5]/div/ul/li[2]/button/div/label/input');
    private close_colour_prompt = By.xpath("//div[@class='refinement refinement--refinement_color is-open']//div[@class='refinement-show']//button[@class='btn refinement-icon-close hidden-md-down']");
    private colour_filtration = By.xpath("//span[@class='filter-bar-value']");

    //Smoke test
    private selected_sneakers = By.xpath('//a[@href="/de/en/pd/carina-2.0-sneakers-women/385849.html?dwvar_385849_color=02"]');

    constructor(driver: WebDriver) {
        super(driver);
    }

    //TEST 4
    async clickOnPriceButton(){
        //await this.driver.sleep(1000);
        await this.driver.manage().setTimeouts({ implicit: 10000 }); //here, it works
        await this.findElementAndClick(this.click_on_price_field);
        }

    async chooseOnePriceOption(){
        await this.driver.sleep(1000);
        //await this.driver.manage().setTimeouts({ implicit: 10000 }); //it does not work here
        await this.waitForElement(this.open_price_field, 10000);
        await this.findElementAndClick(this.choose_price);
    }

    async clickToClosePriceFilter(){
        await this.driver.sleep(1000);
        //await this.driver.manage().setTimeouts({ implicit: 10000 }); //it does not work here
        await this.findElementAndClick(this.close_price_filter);
    }

    async clickToSeeAllOptions(){
        await this.findElementAndClick(this.show_all_items);

    }

    async verifyFiltration(){
        //await this.driver.sleep(1000);
        await this.driver.manage().setTimeouts({ implicit: 10000 });
        await this.waitForElement(this.confirm_filtration, 10000);  
        await this.checkMatchingElements(this.confirm_filtration, testData.verification_message.successful_filtering);
    }

    
    async openSizeFilter(){
        await this.findElementAndClick(this.click_on_size_filter);
    }

    async chooseOneSize(){
        await this.driver.sleep(1000);
        //await this.driver.manage().setTimeouts({ implicit: 10000 }); //here, it does not work
        await this.findElementAndClick(this.choose_size);

    }

    async clickToCloseSizeFilter(){
        await this.driver.sleep(1000);
        //await this.driver.manage().setTimeouts({ implicit: 10000 }); //here, it does not work
        await this.findElementAndClick(this.close_size_prompt);
    }

    async confirmSizeFiltration(){
        //await this.driver.sleep(1000); //here, it does not work
        await this.driver.manage().setTimeouts({ implicit: 10000 });

        const elements = await this.findElement(this.confirm_size_filtration);
        
        if (elements.length >= 2) {
        const secondElementText = await elements[1].getText();   
        await this.checkMatchingElements(secondElementText, testData.verification_message.successful_size_filtering);

        }
    }

    async clickToOpenColourPrompt(){
       //await this.driver.sleep(1000);
        await this.findElementAndClick(this.open_colour_button);
    }

    async chooseColour(){
        await this.driver.sleep(1000);
        //await this.driver.manage().setTimeouts({ implicit: 10000 }); 
        await this.findElementAndClick(this.choose_colour);
    }

    async closeColourPrompt(){
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.close_colour_prompt);
    }

    async confirmColourFiltration(){
        //await this.driver.sleep(1000);
        await this.waitForElement(this.confirm_size_filtration, 20000);
       
        const elements = await this.findElement(this.colour_filtration);
        
        if (elements.length >= 3) {
        const thirdElementText = await elements[2].getText();   
        await this.checkMatchingElements(thirdElementText, testData.verification_message.successful_colour_filtering);

    }
}

    //SMOKE TEST
    async locateFilterMenu(){
        await this.findElement(this.locate_filters_menu);
    }


    async chooseOneItem(){
        await this.findElementAndClick(this.selected_sneakers);
    }
}

    
    
    




    




   



