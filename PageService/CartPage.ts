import { Page } from '@playwright/test';
import { DefaultPage } from './DefaultPage';
import dotenv from 'dotenv';

dotenv.config();

export class CartPage{
    private page: Page;
    private defaultPage: DefaultPage;

    constructor(page: Page){
        this.page = page;
        this.defaultPage = new DefaultPage(page);
    }
}