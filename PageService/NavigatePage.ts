import { Page } from "@playwright/test";

export class NavigatePage{
    private page:Page;

    constructor(page:Page){
        this.page = page;
    }

    navigateTo<T>(action: () => Promise<void>,pageClass: new(page: Page)=> T,page:Page) {
        action();
        return new pageClass(page);
    }
}