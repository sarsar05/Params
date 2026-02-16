import {expect, Page} from '@playwright/test';


export class LoginPage{

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }


    async gotoLoginPage(){
         await this.page.getByRole('link', { name: ' My Account' }).click();
         await this.page.getByRole('link', { name: 'Login' }).click();
    }

    async expectLoginPageUrlAndTitle(){
        await expect(this.page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=account/login'); 
        await expect(this.page).toHaveTitle('Account Login');
    }


    async login(email: string, password: string){
        await this.page.getByRole('textbox', { name: 'E-Mail Address' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async expectAccountPage(){
        await expect(this.page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=account/account');
        await expect(this.page).toHaveTitle('My Account');

        await expect(this.page.getByText ('Edit your account information' )).toBeVisible();
    }

    async logout(){
        await this.page.getByRole('link', { name: 'Logout' }).click();
    }


    async expectLogout(){
        await expect(this.page).toHaveURL('https://tutorialsninja.com/demo/index.php?route=account/logout');
        await expect(this.page).toHaveTitle('Account Logout');

        await expect(this.page.getByRole('heading', { name: 'Account Logout' })).toBeVisible();
        await expect(this.page.getByText('You have been logged off your')).toBeVisible();
        await expect(this.page.getByText('Your shopping cart has been')).toBeVisible();
    }

    async expectAlertErrorMessage(){
        await expect(this.page.locator('.alert-danger')).toBeVisible();
    }


}