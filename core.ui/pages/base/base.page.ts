import { Locator, FrameLocator, Page, expect, test } from '@playwright/test'

export class BasePage {

    public readonly page: Page;
    public readonly PAGE_LOCATOR: Locator;
    public readonly FRAME_LOCATOR: FrameLocator;

    constructor(page: Page, locator?: Locator, frame?: FrameLocator) {
        this.page = page;
        this.PAGE_LOCATOR = locator!;
        this.FRAME_LOCATOR = frame!;
    }
    
    async waitForPage(): Promise<void> {
        if (this.PAGE_LOCATOR != undefined) {
            const stepName: string = `Wait For Page`;
            await test.step(`Wait For Page`, async () => {
                console.debug(stepName);
                await expect(this.PAGE_LOCATOR, 'Page Locator should be visible').toBeVisible({ timeout: 30000, visible: true });
            }); 
        }
    }

    async navigateTo(module: string): Promise<void> {
        const stepName: string = `Navigate To Page '${module}'`;
        await test.step(stepName, async () => {
            console.debug(stepName);
            await this.page.goto(`./${module}`);
            await this.page.waitForLoadState('domcontentloaded');
        }); 
    }
}