import { test } from '@playwright/test';
import { LoginPage } from '../PageService/LoginPage';
import { CartPage } from '../PageService/CartPage';
import { NavigatePage } from '../Utils/NavigatePage';
import { DefaultPage } from '../Utils/DefaultPage';
import { PageTitleEnum } from '../enums/PageTitleEnum';
import { getDataFromDB } from '../Utils/Database';

test("Navigation test",async({page})=>{
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

test("Verify list from DB", async({ page })=>{
    await page.goto('');
    let loginPageObj = new LoginPage(page);
    let defaultPageObj = new DefaultPage(page);
    const productPageObj = await loginPageObj.loginAdmin();
    let productList = await productPageObj.getItemsList();
    await console.log(productList);
    const getProductQuery = "select * from test_schema.products";
    const listFromDb = await getDataFromDB(getProductQuery);
    const itemsNameFromDB = await listFromDb.map(item => item.name);
    await console.log(itemsNameFromDB);
    defaultPageObj.shouldListBeSame(productList,itemsNameFromDB);
})