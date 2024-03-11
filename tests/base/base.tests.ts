import { test as base } from '@playwright/test';
import { TestLinkHelper } from 'utils/common/test.link.helper';
var _globals = require("../../node_modules/playwright/lib/common/globals.js");

export const baseTests =
  base.extend<{ testHook: void }>({
    testHook: [
      async ({ }, use) => {
        console.debug("BEFORE EACH HOOK FROM FIXTURE");
        // Any code here will be run as a before each hook

        await use();

        console.debug("AFTER EACH HOOK FROM FIXTURE");
        // Put any code you want run automatically after each test here

        console.debug("Update TestLink with Test Results...");

        const currentTestInfo = await (await (0, _globals.currentTestInfo)());
        console.debug(`Current Test '${currentTestInfo.title}' finished with status '${currentTestInfo.status}'`);

        let testCaseId = TestLinkHelper.getTestCaseIdFromTestName(currentTestInfo.title);

        if (testCaseId === "") {
          console.debug(`There is no TestLink Id in test name '${currentTestInfo.title}'. Skipping integration with TestLink...`);
          return;
        }

        console.debug(`Test Case ID: ${testCaseId}`);

        let testCase = await TestLinkHelper.getTestCaseByIdFromProject(testCaseId, TestLinkHelper.testProject);
        TestLinkHelper.setTestCaseStatus(currentTestInfo, testCase);
      },
      { auto: true },
    ],
  });