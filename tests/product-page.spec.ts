import { test } from '@playwright/test';
import { LoginPage } from '../PageService/LoginPage';
import { CartPage } from '../PageService/CartPage';
import { NavigatePage } from '../PageService/NavigatePage';

test("New test",async({page})=>{
    await page.goto('/');
    let loginPageObj = new LoginPage(page);
    let navigatePageObj = new NavigatePage(page);
    let productPageObj = await loginPageObj.loginAdmin();
    await productPageObj.sort();
    await productPageObj.addToCart();
    let cartPage = navigatePageObj.navigateTo(()=>productPageObj.goToCart(),CartPage,page);
})