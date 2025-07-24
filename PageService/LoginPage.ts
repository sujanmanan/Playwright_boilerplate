import { Page } from '@playwright/test';
import { loginPageObject } from '../PageObjects/LoginPageObject';
import { DefaultPage } from '../Utils/DefaultPage';
import { ProductPage } from './ProductPage';
import dotenv from 'dotenv';
import { NavigatePage } from '../Utils/NavigatePage';

dotenv.config();

export class LoginPage{
    private page: Page;
    private defaultPage: DefaultPage;
    private navigatePage:NavigatePage;

    constructor(page: Page){
        this.page = page;
        this.defaultPage = new DefaultPage(page);
        this.navigatePage = new NavigatePage(page);
    }

    async login(username:string,password:string){
        await this.defaultPage.getByRole(...loginPageObject.usernameNameLocator).fill(username);
        await this.defaultPage.getByRole(...loginPageObject.passwordNameLocator).fill(password);
        await this.defaultPage.getByRole(...loginPageObject.loginBtn).click();
    }

    async loginAdmin() {
        return await this.navigatePage.navigateTo(
            () => this.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!),
            ProductPage,this.page 
        );
    }
}