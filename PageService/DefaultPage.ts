import { Page,Locator,expect } from '@playwright/test';

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

    getText(locator:Locator){
        return locator.textContent();
    }

    getFirstOptionValueFromDropdown(dropdown: Locator){
        const firstOption = dropdown.locator('option:not([value=""])').first();
        return firstOption.getAttribute('value');
    }

    shouldBeEqual(actual:any,expected:any){
        expect(actual).toBe(expected);
    }

    shouldListBeEqual(actual:any,expected:any){
        expect(actual).toEqual(expected);
    }

    shouldTitleBeEqual(page:Page,expectedTitle:string){
        expect(page).toHaveTitle(expectedTitle);
    }

    shouldTextBeEquivalent(actual:Locator,expected:any){
        expect(actual).toHaveText(expected);
    }

    shouldContainText(actual:Locator,expected:any){
        expect(actual).toContainText(expected);
    }

    getListText(object:string){
        return this.page.locator(object).allTextContents();
    }

    shouldCheckboxBeClicked(object:Locator){
        expect(object).toBeChecked();
    }

    shouldObjectBeEnabled(object:Locator){
        expect(object).toBeEnabled();
    }

}