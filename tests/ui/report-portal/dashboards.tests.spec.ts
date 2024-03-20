import { uiTest as test } from 'tests/base/ui.base.tests';
import { getEnv } from 'environments';
import { TestLinkConfig } from 'playwright.config';
import { TestLinkHelper } from 'utils/common/test.link.helper';

const dashboardNamePrefix: string = 'Automation for Dashboards Tests';
/** 
 * ============================================
 * Suite Name: 'Dashboards Tests'
 * ============================================
 */
test.describe('Dashboards Tests @Sanity @UI', async () => {

  /**
   * Prerequisites Before All: 
   * Get TestLink Integration Data
   */
  test.beforeAll(async ({ }) => {
    // --- Here you can do some global preparation steps ---
    TestLinkConfig.plan = 'UI Dashboards Test Plan';
    TestLinkConfig.build = 'UI Dashboards Build';
    TestLinkHelper.getTestLinkIntegrationData();
  });

    /**
   * Clean Up After All: Print Total Info
   */
    test.afterAll(async ({}) => {
      // --- Here you can do some global clean up steps ---
      TestLinkHelper.printTotalInfo();
    });
    
  /**
   * Prerequisites to each test:
   * Login into system with prepared user
   */
  test.beforeEach(async ({ loginPage, dashboardsPage, sidebarPage }) => {   
    await loginPage.navigateToURL();
    await loginPage.login(getEnv().uiAdminUserName, getEnv().uiAdminPassword);
    await sidebarPage.clickDashboardsNavigationButton();
    await dashboardsPage.waitForPage();
  });

  /**
   * Clean Up after each test:
   * Delete Dashboard with prefix "Automation for Dashboards Tests"
   */
  test.afterEach(async ({ dashboardsPage, sidebarPage }) => {
    await sidebarPage.clickDashboardsNavigationButton();
    await dashboardsPage.searchForDashboard(dashboardNamePrefix);
    await dashboardsPage.deleteDhashboardByName(dashboardNamePrefix);
  });

  /**
   * Test Name: [TC-3] Add New Dashboard        
   * Steps:
      1. Click Add New Dashboard button
      2. Set New Dashboard Name as 'New Dashboard Name - Automation for Dashboards Tests'
      3. Click Add button
      4. Verify that Dashboard Details View opened and Title in Breadcrumbs is equal to 'New Dashboard Name - Automation for Dashboards Tests'
    */
  test('[TC-3] Add New Dashboard @Sanity', async ({ dashboardsPage, dashboardPage }) => {
    const newDashboardName: string = `New Dashboard Name - ${dashboardNamePrefix}`;
    await dashboardsPage.addNewDashboard(newDashboardName);
    dashboardPage.verifyDashbopardTitleViaBreadcrumbs(newDashboardName)
  });
});