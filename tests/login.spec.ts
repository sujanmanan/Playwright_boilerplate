import { test } from '@playwright/test';
import { LoginPage } from '../PageService/LoginPage';

test("Test", async ({ page }) => {
    await page.goto('');
    let loginPageObj = new LoginPage(page);
    loginPageObj.loginAdmin();
});

