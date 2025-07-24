import { Page } from '@playwright/test';
import { DefaultPage } from '../Utils/DefaultPage';
import dotenv from 'dotenv';
import { productPageObject } from '../PageObjects/ProductPageObject';

dotenv.config();

export class ProductPage{
    private page: Page;
    private defaultPage: DefaultPage;

    constructor(page: Page){
        this.page = page;
        this.defaultPage = new DefaultPage(page);
    }

    async sort(){
        await this.defaultPage.selectDropdown(this.defaultPage.getByClass(productPageObject.productSort),'za');
    }

    async getItemsList(){
        return await this.defaultPage.getListText(productPageObject.productList);
    }

    async addToCart(){
        await this.defaultPage.getByRole(...productPageObject.addToCart).first().click();
    }

    async goToCart(){
        await this.defaultPage.getByClass(productPageObject.goToCart).click();
    }
}