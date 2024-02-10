import { test as base } from '@playwright/test';
import { combineFixtures } from 'tests/fixtures/combine.fixtures';
import { authenticationFixture, AuthenticationFixture } from 'tests/fixtures/api/authentication.api';
import { contextPagesFixture, ContextPagesFixture } from 'tests/fixtures/ui/context.page';
import { productsApiFixture, ProductsApiFixture } from 'tests/fixtures/api/products.api';

export const apiTests = 
    base.extend<ContextPagesFixture, AuthenticationFixture>(combineFixtures(contextPagesFixture, authenticationFixture))
        .extend<AuthenticationFixture, ProductsApiFixture>(combineFixtures(authenticationFixture, productsApiFixture));