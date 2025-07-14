import { test } from '@playwright/test';
import { LoginPage } from '../PageService/LoginPage';
import { CartPage } from '../PageService/CartPage';
import { NavigatePage } from '../PageService/NavigatePage';
import { DefaultPage } from '../PageService/DefaultPage';
import { PageTitleEnum } from '../enums/PageTitleEnum';

test("New test",async({page})=>{
    await page.goto('');
    let loginPageObj = new LoginPage(page);
    let defaultPageObj = new DefaultPage(page);
    let navigatePageObj = new NavigatePage(page);
    defaultPageObj.shouldTitleBeEqual(page,PageTitleEnum.Login);
    let productPageObj = await loginPageObj.loginAdmin();
    await productPageObj.sort();
    await productPageObj.addToCart();
    let cartPage = await navigatePageObj.navigateTo(()=>productPageObj.goToCart(),CartPage,page);
})