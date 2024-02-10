import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from 'core.ui/pages/base/base.page';

export class DeleteDashboardDialog extends BasePage {

    readonly DELETE_BUTTON: Locator;
    readonly CANCEL_BUTTON: Locator;
    
    constructor(page: Page) {
        super(page, page.locator('[class*="modalLayout__modal-window"]'));
        this.DELETE_BUTTON = this.page.locator('//button[text()="Delete"]');
        this.CANCEL_BUTTON = this.page.locator('//button[text()="Cancel"]');
    }

    async clickDelete(): Promise<void> {
        const stepName: string = `Click Delete`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.DELETE_BUTTON.click();
            await this.DELETE_BUTTON.waitFor({state: 'hidden'});
            await expect(this.PAGE_LOCATOR, 'Delete Button should be hidden').toBeHidden();
        }); 
    }

    async clickCancel(): Promise<void> {
        const stepName: string = `Click Cancel`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.CANCEL_BUTTON.click();
            await this.CANCEL_BUTTON.waitFor({state: 'hidden'});
            await expect(this.CANCEL_BUTTON, 'Cancel Button should be hidden').toBeHidden();
        }); 
    }
}