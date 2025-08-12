import { test } from '@playwright/test';
import { LoginPage } from '../PageService/LoginPage';
import { CartPage } from '../PageService/CartPage';
import { NavigatePage } from '../Utils/NavigatePage';
import { DefaultPage } from '../Utils/DefaultPage';
import { PageTitleEnum } from '../enums/PageTitleEnum';
import { getDataFromDB } from '../Utils/Database';

test.beforeEach(async({ page })=>{
    await page.goto('');
})

test("Navigation test",async({page})=>{
    const loginPageObj = new LoginPage(page);
    const defaultPageObj = new DefaultPage(page);
    const navigatePageObj = new NavigatePage(page);
    defaultPageObj.shouldTitleBeEqual(page,PageTitleEnum.Login);
    const productPageObj = await loginPageObj.loginAdmin();
    await productPageObj.sort();
    await productPageObj.addToCart();
    let cartPage = await navigatePageObj.navigateTo(()=>productPageObj.goToCart(),CartPage,page);
})

test("Verify list from DB", async({ page })=>{
    const loginPageObj = new LoginPage(page);
    const defaultPageObj = new DefaultPage(page);
    const productPageObj = await loginPageObj.loginAdmin();
    const productList = await productPageObj.getItemsList();
    const getProductQuery = "select * from products";
    const listFromDb = await getDataFromDB(getProductQuery)
    const names = listFromDb.map(item => item.name)
    defaultPageObj.shouldListBeEquivalent(productList,names);
})