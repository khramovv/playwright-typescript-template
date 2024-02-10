import { uiTest as test } from 'tests/base/ui.base.tests';
import { getEnv } from 'environments';

const dashboardNamePrefix: string = 'Automation for Dashboards Tests';
/** 
 * ============================================
 * Suite Name: 'Dashboards Tests'
 * ============================================
 */
test.describe('Dashboards Tests @Sanity @UI', async () => {

  /**
   * Prerequisites to each test:
   * Login into system with prepared user
   */
  test.beforeEach(async ({ loginPage, dashboardsPage }) => {   
    await loginPage.navigateToURL();
    await loginPage.login(getEnv().uiAdminUserName, getEnv().uiAdminPassword);
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
   * Test Name: Add New Dashboard        
   * Steps:
      1. Click Add New Dashboard button
      2. Set New Dashboard Name as 'New Dashboard Name - Automation for Dashboards Tests'
      3. Click Add button
      4. Verify that Dashboard Details View opened and Title in Breadcrumbs is equal to 'New Dashboard Name - Automation for Dashboards Tests'
    */
  test('Add New Dashboard @Sanity', async ({ dashboardsPage, dashboardPage }) => {
    const newDashboardName: string = `New Dashboard Name - ${dashboardNamePrefix}`;
    await dashboardsPage.addNewDashboard(newDashboardName);
    dashboardPage.verifyDashbopardTitleViaBreadcrumbs(newDashboardName)
  });
});