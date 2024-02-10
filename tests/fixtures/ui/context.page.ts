import { Fixtures, Page, PlaywrightTestArgs } from '@playwright/test';

export type ContextPagesFixture = {
  contextPage: Page;
};

export const contextPagesFixture: Fixtures<ContextPagesFixture, PlaywrightTestArgs> = {
  contextPage: async ({ page }, use) => {
    await use(page);
  }
};