import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from 'core.ui/pages/base/base.page';

export class SidebarPage extends BasePage{

    readonly USER_PROFILE_BUTTON: Locator;
    readonly DASHBOARDS_BUTTON: Locator;
    
    constructor(page: Page) {
        super(page, page.locator('[class*="layout__sidebar-container"]'));
        this.USER_PROFILE_BUTTON = page.locator(`img[class^='userBlock__avatar']`);
        this.DASHBOARDS_BUTTON = page.locator(`a[class*='sidebarButton'][href*='dashboard']`);
    }

    async waitForPage(): Promise<void> {  
        const stepName: string = `Wait For Sidebar Page`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.USER_PROFILE_BUTTON.waitFor();
            await expect(this.USER_PROFILE_BUTTON, 'User Profile Button should be visible').toBeVisible();
        });       
    }

    async clickDashboardsNavigationButton(): Promise<void> {
        const stepName: string = `Click Dashboards Navigation Button`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.DASHBOARDS_BUTTON.click();
            await this.page.waitForURL(`**\/dashboard`);
        }); 
    }
}