import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { TestLinkAPIRoutes } from 'core.api/clients/endpoints/testlink.routes';
import { APIClient } from 'core.api/clients/base/api.client';
import { ApiWrapper } from 'core.api/utils/api.wrapper';
import { getDefaultAPIContext } from 'core.api/clients/base/context/testlink.default.context';

export class TestLinkApiClient implements APIClient {
  private constructor(public context?: APIRequestContext) { }

  async getTestProjects(): Promise<APIResponse> {
    console.debug(`Get All Test Projects`);
    return ApiWrapper.get(this.context, TestLinkAPIRoutes.TestProjects);
  }

  async getTestPlansOfProject(id: string): Promise<APIResponse> {
    console.debug(`Get All Test Plans Of Project '${id}'`);
    return ApiWrapper.get(this.context, TestLinkAPIRoutes.TestPlansOfTestProject(id));
  }

  async getBuildsOfTestPlan(id: string): Promise<APIResponse> {
    console.debug(`Get All Builds Of Test Plan '${id}'`);
    return ApiWrapper.get(this.context, TestLinkAPIRoutes.BuildsOfTestPlan(id));
  }

  async getTestCasesOfTestProject(id: string): Promise<APIResponse> {
    console.debug(`Get All Test Cases Of Test Project '${id}'`);
    return ApiWrapper.get(this.context, TestLinkAPIRoutes.TestCasesOfTestProject(id));
  }

  async postExecutions(testProjectId: String, testPlanId: String, buildId: String, testCaseExternalId: String, notes: String, statusCode: String): Promise<APIResponse> {
    console.debug(`Set Status as '${statusCode}' and Notes as '${notes}' for Test Case '${testCaseExternalId}' from Test Plan '${testPlanId}', Build '${buildId}' and Project '${testProjectId}'`);
    let data = { 
      testProjectID: testProjectId, 
      testPlanID: testPlanId, 
      buildID: buildId, 
      testCaseExternalID: testCaseExternalId, 
      notes: notes, 
      statusCode: statusCode 
    };
    return ApiWrapper.post(this.context, TestLinkAPIRoutes.Executions, { data });
  }

  static getTestLinkApiClient = async (): Promise<TestLinkApiClient> => {
    const defaultContext = await getDefaultAPIContext();
    
    return new TestLinkApiClient(defaultContext);
  }
}