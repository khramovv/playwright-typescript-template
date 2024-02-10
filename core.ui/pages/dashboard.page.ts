import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from 'core.ui/pages/base/base.page';

export class DashboardPage extends BasePage{

    readonly TITLE_BREADCRUMB: Locator;
    
    constructor(page: Page) {
        super(page, page.locator('[class^="layout__page-container"]'));
        this.TITLE_BREADCRUMB = page.locator('li span[title]');
    }

    async waitForPage(): Promise<void> {   
        const stepName: string = `Wait For Dashboard Page`;
        await test.step(`Wait For Dashboard Page`, async () => {
            console.debug(stepName);
            await this.TITLE_BREADCRUMB.waitFor();
            await expect(this.TITLE_BREADCRUMB, 'Title Breadcrumbs should be visible').toBeVisible();
        });      
    }

    async verifyDashbopardTitleViaBreadcrumbs(name: string): Promise<void> { 
        const stepName: string = `Verify that Dashbopard Title in Breadcrumbs equal '${name}'`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            expect(this.TITLE_BREADCRUMB, `Title Breadcrumbs should have text '${name}'`).toHaveText(name);  
        });      
    }
}