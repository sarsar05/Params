import {expect, Page} from '@playwright/test';


export class BasePage{

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async open(){
        await this.page.goto('https://tutorialsninja.com/demo/index.php?route=common/home');
        await expect(this.page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=common/home');
        await expect(this.page).toHaveTitle('Your Store');
    }   


    async expectHomePage(){
        await expect(this.page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=common/home');
        await expect(this.page).toHaveTitle('Your Store');
    }

    async expectTitleAndUrl(title: string, url: string){
        await expect(this.page).toHaveTitle(title);
        await expect(this.page).toHaveURL(url);
    }

}