import { chromium,FullConfig } from "@playwright/test";
import { PageUrlEnum } from "./enums/PageUrlEnum";
import { LoginPage } from "./PageService/LoginPage";
import { DefaultPage } from "./Utils/DefaultPage";
import dotenv from 'dotenv';
import { PageTitleEnum } from "./enums/PageTitleEnum";

dotenv.config();

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const defaultPage = new DefaultPage(page);
    await page.goto(PageUrlEnum.BaseURL);
    defaultPage.shouldBeEqual(await page.title(),PageTitleEnum.Login);
    await loginPage.login(process.env.Test_Username!,process.env.Test_Password!)
    await page.context().storageState({ path: 'auth.json' });
    await browser.close();
}

export default globalSetup;