import { baseTests as base } from 'tests/base/base.tests';
import { combineFixtures } from 'tests/fixtures/combine.fixtures'
import { authenticationFixture, AuthenticationFixture } from 'tests/fixtures/api/authentication.api';
import { productsApiFixture, ProductsApiFixture } from 'tests/fixtures/api/products.api';
import { reportPortalFixture, ReportPortalFixture } from 'tests/fixtures/ui/report.portal.ui.pages';
import { contextPagesFixture, ContextPagesFixture } from 'tests/fixtures/ui/context.page';

export const uiTest = 
    base.extend<ContextPagesFixture, ReportPortalFixture>(combineFixtures(contextPagesFixture, reportPortalFixture))
        .extend<ContextPagesFixture, AuthenticationFixture>(combineFixtures(contextPagesFixture, authenticationFixture))
        .extend<AuthenticationFixture, ProductsApiFixture>(combineFixtures(authenticationFixture, productsApiFixture));