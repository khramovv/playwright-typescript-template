import { Fixtures } from '@playwright/test';
import { ContextPagesFixture } from './context.page';
import { LoginPage } from 'core.ui/pages/login.page';
import { DashboardsPage } from 'core.ui/pages/dashboards.page';
import { DashboardPage } from 'core.ui/pages/dashboard.page';
import { SidebarPage } from 'core.ui/pages/sidebar.page';

export type ReportPortalFixture = {
    loginPage: LoginPage;
    dashboardsPage: DashboardsPage;
    dashboardPage: DashboardPage;
    sidebarPage: SidebarPage;
};

export const reportPortalFixture: Fixtures<ReportPortalFixture, ContextPagesFixture> = {
    loginPage: async ({ contextPage }, use) => {
        await use(new LoginPage(contextPage));
    },
    dashboardsPage: async ({ contextPage }, use) => {
        await use(new DashboardsPage(contextPage));
    },
    dashboardPage: async ({ contextPage }, use) => {
        await use(new DashboardPage(contextPage));
    },
    sidebarPage: async ({ contextPage }, use) => {
        await use(new SidebarPage(contextPage));
    },
};