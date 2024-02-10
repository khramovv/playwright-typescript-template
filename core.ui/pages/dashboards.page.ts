import { Locator, Page, expect, test } from '@playwright/test';
import { BasePage } from 'core.ui/pages/base/base.page';
import { AddDashboardDialog } from './popup.dialogs/add.dashboard.dialog';
import { DeleteDashboardDialog } from './popup.dialogs/delete.dashboard.dialog';

export class DashboardsPage extends BasePage{

    readonly ADD_NEW_DASHBOARD_BUTTON: Locator;
    readonly SEARCH_INPUT: Locator;
    readonly DELETE_DASHBOARD_BUTTON: Locator;
    readonly addDialog: AddDashboardDialog; 
    readonly deleteDialog: DeleteDashboardDialog;
    
    constructor(page: Page) {
        super(page, page.locator('[class*="layout__page-container"]'));
        this.addDialog = new AddDashboardDialog(this.page); 
        this.deleteDialog = new DeleteDashboardDialog(this.page); 
        this.ADD_NEW_DASHBOARD_BUTTON = page.locator('[class*="addDashboardButton"] button');
        this.SEARCH_INPUT = page.locator('[placeholder="Search by name"]');
    }

    async waitForPage(): Promise<void> {   
        const stepName: string = `Wait For Dashboards Page`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.ADD_NEW_DASHBOARD_BUTTON.waitFor();
            await expect(this.ADD_NEW_DASHBOARD_BUTTON, 'Add New Dashboard Button should be visible').toBeVisible();
        });   
    }

    async addNewDashboard(name: string, description: string = '', confirmAdd: boolean = true): Promise<void> { 
        const stepName: string = `Add New Dashboard with name = '${name}', description = '${description}' and with operation ${confirmAdd? 'Add' : 'Cancel'}`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.ADD_NEW_DASHBOARD_BUTTON.click();
            await this.addDialog.setName(name);
            await this.addDialog.setDescriptoin(description);
            if (confirmAdd) {
                await this.addDialog.clickAdd();
            }
            else {
                await this.addDialog.clickCancel();
            }
        });  
    }

    async searchForDashboard(name: string): Promise<void> { 
        const stepName: string = `Search For Dashboard with name = '${name}'`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.SEARCH_INPUT.fill(name);
        });  
    }

    async deleteDhashboardByName(name: string, confirmDelete: boolean = true): Promise<void> { 
        const stepName: string = `Delete Dashboard by name = '${name}' with operation ${confirmDelete? 'Delete' : 'Cancel'}`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.gethashboardRowByName(name).locator(`[class*='icon-delete']`).click(); 
            if (confirmDelete) {
                await this.deleteDialog.clickDelete();
            }
            else {
                await this.deleteDialog.clickCancel();
            }
        });  
    }

    gethashboardRowByName(name: string): Locator { 
        const stepName: string = `Get Dashboard Row by name = '${name}'`;
        console.debug(stepName);
        return this.page.locator(`//*[contains(@class,'gridCell') and contains(text(), '${name}')]/ancestor::div[contains(@class,'gridRow__grid-row--')]`); 
    }
}