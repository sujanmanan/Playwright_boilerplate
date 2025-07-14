import { Page } from "@playwright/test";
import { PageUrlEnum } from "../enums/PageUrlEnum";

export class NavigatePage{
    private page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async navigateTo<T>(action: () => Promise<void>,pageClass: new(page: Page)=> T,page:Page):Promise<T> {
        await action();
        const url = page.url();
        const expectedUrl = PageUrlEnum.BaseURL + PageUrlEnum[pageClass.name as keyof typeof PageUrlEnum];
        if (url !== expectedUrl) {
        throw new Error(`Expected URL ${expectedUrl}, but got ${url}`);
        }
        console.log(`Navigated to ${pageClass.name}`);
        return new pageClass(page);
    }
}