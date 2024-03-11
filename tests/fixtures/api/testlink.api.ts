import { Fixtures } from "@playwright/test";
import { TestLinkApiClient } from "core.api/clients/controllers/testlink.controller";

export type TestLinkApiFixture = {
  testLinkClient: TestLinkApiClient;
};

export const testLinkApiFixture: Fixtures<TestLinkApiFixture> = {
  testLinkClient: async ({}, use) => {
    const testLinkClient = await TestLinkApiClient.getTestLinkApiClient();

    await use(testLinkClient);
  },
};
