import { Page } from '@playwright/test';
import { loginPageObject } from '../PageObjects/LoginPageObject';
import { DefaultPage } from './DefaultPage';

export class LoginPage{
    private page: Page;
    private defaultPage: DefaultPage;

    constructor(page: Page){
        this.page = page;
        this.defaultPage = new DefaultPage(page);
    }

    async login(username:string,password:string){
        await this.defaultPage.getByRole(...loginPageObject.usernameNameLocator).fill(username);
        await this.defaultPage.getByRole(...loginPageObject.passwordNameLocator).fill(password);
        await this.defaultPage.getByRole(...loginPageObject.loginBtn).click();
    }
}