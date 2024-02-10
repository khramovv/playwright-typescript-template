import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from 'core.ui/pages/base/base.page';

export class AddDashboardDialog extends BasePage {

    readonly NAME_INPUT: Locator;
    readonly DESCRIPTION_INPUT: Locator;
    readonly ADD_BUTTON: Locator;
    readonly CANCEL_BUTTON: Locator;
    
    constructor(page: Page) {
        super(page, page.locator('[class*="modalLayout__modal-window"]'));
        this.NAME_INPUT = this.page.locator('[placeholder="Enter dashboard name"]');
        this.DESCRIPTION_INPUT = this.page.locator('[placeholder="Enter dashboard description"]');
        this.ADD_BUTTON = this.page.locator('//button[text()="Add"]');
        this.CANCEL_BUTTON = this.page.locator('//button[text()="Cancel"]');
    }

    async clickAdd(): Promise<void> {
        const stepName: string = `Click Add`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.ADD_BUTTON.click();
            await this.ADD_BUTTON.waitFor({state: 'hidden'});
            await expect(this.PAGE_LOCATOR, 'Add Button should be hidden').toBeHidden();
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

    async setName(name: string): Promise<void> {
        const stepName: string = `Set Name as '${name}'`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.NAME_INPUT.clear();
            await this.NAME_INPUT.fill(name);
        });  
    }

    async setDescriptoin(description: string): Promise<void> {
        const stepName: string = `Set Description as '${description}'`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.DESCRIPTION_INPUT.clear();
            await this.DESCRIPTION_INPUT.fill(description);
        });  
    }
}