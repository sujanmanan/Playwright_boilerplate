import { Page,Locator,expect } from '@playwright/test';
import { PageTitleEnum } from '../enums/PageTitleEnum';

export class DefaultPage{
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    getById(locator:string){
        return this.page.locator(`#${locator}`);
    }

    getByName(locator:string){
        return this.page.locator(`[name="${locator}"]`)
    }

    getByClass(locator:string){
        return this.page.locator(`.${locator}`);
    }

    getByXpath(locator:string){
        return this.page.locator(`xpath=${locator}`);
    }

    getByLinkText(text:string){
        return this.page.locator('a',{ hasText: `${text}`});
    }

    getByText(text:string){
        return this.page.getByText(text);
    }
    
    getByRole(role: Parameters<Page['getByRole']>[0], name: string) {
        return this.page.getByRole(role, { name });
    }

    selectDropdown(locator:Locator, value:string | null){
        return locator.selectOption(value);
    }

    getFirstOptionValueFromDropdown(dropdown: Locator){
        const firstOption = dropdown.locator('option:not([value=""])').first();
        return firstOption.getAttribute('value');
    }

    shouldBeEqual(actual:any,expected:any){
        expect(actual).toBe(expected);
    }

}