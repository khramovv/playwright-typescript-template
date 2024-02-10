import { Locator, Page, test } from '@playwright/test';
import { BasePage } from 'core.ui/pages/base/base.page';

export class LoginPage extends BasePage {

    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;

    constructor(page: Page) {
        super(page, page.locator('[class*="loginPage__login-page-content"]'))
        this.USERNAME_EDITBOX = page.locator('[name="login"]');
        this.PASSWORD_EDITBOX = page.locator('[name="password"]');
        this.LOGIN_BUTTON = page.locator('button[type="submit"]');
    }

    async login(userName: string, password: string): Promise<void>  {
        const stepName: string = `Login with user: '${userName}' and password: '${password}'`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.USERNAME_EDITBOX.fill(userName);
            await this.PASSWORD_EDITBOX.fill(password);
            await this.LOGIN_BUTTON.click();
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    async navigateToURL(): Promise<void> {
        const stepName: string = `Navigate to Base Url`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.navigateTo('');
        }); 
    }
}