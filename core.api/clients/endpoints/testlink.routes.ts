export class TestLinkAPIRoutes {
  public static TestProjects = 'testprojects';
  public static TestPlansOfTestProject = (id: string) => `testprojects/${id}/testplans`;
  public static BuildsOfTestPlan = (id: string) => `testplans/${id}/builds`;
  public static TestCasesOfTestProject = (id: string) => `testprojects/${id}/testcases`;
  public static Executions = 'executions';
}
