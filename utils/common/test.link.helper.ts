import { TestInfo } from "@playwright/test";
import { TestLinkApiClient } from "core.api/clients/controllers/testlink.controller";
import { validateStatusCode } from "core.api/utils/assertions";
import { TestLinkConfig } from "playwright.config";
import { writeFileSync } from 'fs';
import { table } from 'table';

export class TestLinkHelper {
    constructor() { }

    public static testProject: { name: string, id: string, prefix: string };

    public static testPlan: { name: string, id: string, api_key: string };

    public static build: { name: string, id: string };

    public static testLinkStatisticsFilePath = `./TestLinkIntegrationResults.txt`;

    public static totalInfo: [{
        TestCaseName: string,
        Status: string,
        TestLink:
        {
            TestProject: { id: string, prefix: string },
            TestPlan: { id: string },
            Build: { id: string },
            TestCase: { name: string, tc_external_id: string }
        },
        ErrorMessage: string
    }?] = [];

    public static getStatusFromTestInfo(testInfo: TestInfo): string {
        switch (testInfo.status) {
            case "passed": {
                return "p";
            }
            case "failed": {
                return "f";
            }
            case "skipped": {
                return "b";
            }
            default: {
                return "b";
            }
        }
    }

    public static getTestCaseIdFromTestName(testName: string): string {
        const testCaseIdAsArray: string[] = testName.match(/(?<=\[)[\s\S]*?(?=\])/g);
        if (testCaseIdAsArray.length === 0) {
            console.debug(`There is no TestLink Id in test name '${testName}'. Skipping integration with TestLink...`);
            return "";
        }
        return testCaseIdAsArray?.at(0);
    }

    public static async getTestProjectByName(testProjectName: string): Promise<{ name: string, id: string, prefix: string }> {
        const testLinkClient = await TestLinkApiClient.getTestLinkApiClient();

        // ------------------------------------------------Get Test Project ------------------------------------------------
        let testProjectResponse = await testLinkClient.getTestProjects();
        await validateStatusCode(testProjectResponse, 200);
        let projects: { name: string, id: string, prefix: string }[] = JSON.parse(await testProjectResponse.text()).item;

        if (projects.length === 0) {
            console.debug(`No projects found in TestLink. Skipping integration with TestLink...`);
            return;
        }

        this.testProject = projects.find(p => p.name === testProjectName);
        return this.testProject;
    }

    public static async getTestCaseByIdFromProject(testCaseId: string, testProject: { name: string, id: string, prefix: string }): Promise<{ name: string, id: string, tc_external_id: string }> {
        const testLinkClient = await TestLinkApiClient.getTestLinkApiClient();

        // ------------------------------------------------Get Test Case Of Test Project ------------------------------------------------
        let testCasesResponse = await testLinkClient.getTestCasesOfTestProject(testProject.id);
        await validateStatusCode(testCasesResponse, 200);
        let testCases: { name: string, id: string, tc_external_id: string }[] = JSON.parse(await testCasesResponse.text()).items;

        if (testCases.length === 0) {
            console.debug(`No test cases found under the project '${testProject.name}' in TestLink. Skipping integration with TestLink...`);
            return;
        }

        return testCases.find(p => p.tc_external_id === testCaseId.split("-")?.at(-1));
    }

    public static async getTestPlanByNameFromProject(testPlanName: string, testProject: { name: string, id: string, prefix: string }): Promise<{ name: string, id: string, api_key: string }> {
        const testLinkClient = await TestLinkApiClient.getTestLinkApiClient();

        // ------------------------------------------------Get Test Plan ------------------------------------------------
        let testPlansResponse = await testLinkClient.getTestPlansOfProject(testProject.id);
        await validateStatusCode(testPlansResponse, 200);
        let testPlans: { [key: string]: { name: string, id: string, api_key: string } } = JSON.parse(await testPlansResponse.text()).items;

        if (!testPlans || Object.keys(testPlans).length === 0) {
            console.debug(`No test plans found under the project '${testProject.name}' in TestLink. Skipping integration with TestLink...`);
            return;
        }

        this.testPlan = Object.values(testPlans).filter((plan) => plan.name === testPlanName)?.at(0);
        return this.testPlan;
    }

    public static async getTestPlanBuildByNameFromTestPlan(buildName: string, testPlan: { name: string, id: string, api_key: string }): Promise<{ name: string, id: string }> {
        const testLinkClient = await TestLinkApiClient.getTestLinkApiClient();

        // ------------------------------------------------Get Test Plan Build ------------------------------------------------
        let testPlanBuildResponse = await testLinkClient.getBuildsOfTestPlan(testPlan.api_key);
        await validateStatusCode(testPlanBuildResponse, 200);
        let builds: { [key: string]: { name: string, id: string } } = JSON.parse(await testPlanBuildResponse.text()).items;

        if (!builds || Object.keys(builds).length === 0) {
            console.debug(`No builds found under the test plan '${testPlan.name}' in TestLink. Skipping integration with TestLink...`);
            return;
        }

        this.build = Object.values(builds).filter((build) => build.name === buildName)?.at(0);
        return this.build;
    }

    public static async setTestCaseStatus(
        testInfo: TestInfo,
        testCase: { name: string, tc_external_id: string },
        testProject: { id: string, prefix: string } = this.testProject,
        testPlan: { id: string } = this.testPlan,
        build: { id: string } = this.build): Promise<void> {
        const testLinkClient = await TestLinkApiClient.getTestLinkApiClient();

        const testCaseInfo = {
            TestCaseName: testInfo.title,
            Status: testInfo.status,
            TestLink:
            {
                TestProject: testProject,
                TestPlan: testPlan,
                Build: build,
                TestCase: testCase
            },
            ErrorMessage: ''
        };

        if (!testProject) {
            testCaseInfo.ErrorMessage += `Test Project is not set. Skipping integration with TestLink; `;
        }

        if (!testPlan) {
            testCaseInfo.ErrorMessage += `Test Plan is not set. Skipping integration with TestLink; `;
        }

        if (!build) {
            testCaseInfo.ErrorMessage += `Build is not set. Skipping integration with TestLink; `;
        }

        if (!testCase) {
            testCaseInfo.ErrorMessage += `Test Case is not set. Skipping integration with TestLink; `;
        }

        if(testCaseInfo.ErrorMessage) {
            console.debug(testCaseInfo.ErrorMessage);
            this.totalInfo.push(testCaseInfo);
            return;
        }

        // ------------------------------------------------ Set Test Case Status ------------------------------------------------
        let note = `Test Case ${testCase.name} finished with status ${testInfo.status}.${testInfo.status == 'failed'
            ? `\r\n${testInfo.error.message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '').replace(/(\r\n|\n|\r)/gm, ' ')}`
            : ''
            }`;
        let executionResponse = await testLinkClient.postExecutions(
            testProject.id,
            testPlan.id,
            build.id,
            `${testProject.prefix}-${testCase.tc_external_id}`,
            note,
            TestLinkHelper.getStatusFromTestInfo(testInfo)
        );

        if(executionResponse.status() !== 200) {
            testCaseInfo.ErrorMessage = `Error while setting status for test case: ${await executionResponse.text()}`;
        }

        this.totalInfo.push(testCaseInfo);

        // TODO: uncomment if you want to fail test in tear down if integration with TestLink failed
        // await validateStatusCode(executionResponse, 200);
    }

    public static async getTestLinkIntegrationData(): Promise<void> {
        console.debug('Get TestLink Integration Data...');

        let testProjectName = TestLinkConfig.project;
        let testPlanName = TestLinkConfig.plan;
        let buildName = TestLinkConfig.build;

        const testProject = await TestLinkHelper.getTestProjectByName(testProjectName);
        console.debug(`Test Project: ${JSON.stringify(testProject)}`);

        const testPlan = await TestLinkHelper.getTestPlanByNameFromProject(testPlanName, testProject);
        console.debug(`Test Plan: ${JSON.stringify(testPlan)}`);

        const build = await TestLinkHelper.getTestPlanBuildByNameFromTestPlan(buildName, testPlan);
        console.debug(`Build: ${JSON.stringify(build)}`);

        console.debug(`TestLink Integration Data retrieved successfully`);
    }

    public static printTotalInfo(): void {
        console.debug('TestLink Total Info:');
        const flattenedData = this.totalInfo.map((info) => {
            return {
                TestCaseName: info.TestCaseName,
                Status: info.Status,
                TestProjectId: info.TestLink.TestProject?.id,
                TestPlanId: info.TestLink.TestPlan?.id,
                BuildId: info.TestLink.Build?.id,
                TestCaseId: info.TestLink.TestCase?.tc_external_id,
                ErrorMessage: info.ErrorMessage
            }
        });

        let output = ` === Test Project: '${this.testProject.name}', Test Plan: '${this.testPlan.name}', Build: '${this.build.name}' ===\n`;
        let tableData = [['Test Case Name', 'Status', 'Test Project Id', 'Test Plan Id', 'Build Id', 'Test Case Id','Error Message']];
        tableData = [...tableData, ...flattenedData.map(Object.values)];

        output += table(tableData);
        output += '\n';
        console.debug(output);

        writeFileSync(TestLinkHelper.testLinkStatisticsFilePath, output, { flag: 'a' });
    }
}
