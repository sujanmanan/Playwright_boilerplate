import { expect, test } from '@playwright/test';
import { DefaultPage } from '../PageService/DefaultPage';
import { LoginPage } from '../PageService/LoginPage';

test("Test", async ({ page }) => {
    await page.goto('/');
    const defaultPageObj = new DefaultPage(page);
    let loginPageObj = new LoginPage(page);
    loginPageObj.loginAdmin();
});

