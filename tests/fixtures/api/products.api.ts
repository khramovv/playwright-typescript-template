import { Fixtures } from '@playwright/test';
import { AuthenticationFixture } from './authentication.api';
import { ProductsApiClient } from 'core.api/clients/controllers/products.controller';
import { getAuthAPIContext } from 'core.api/clients/base/context/auth.context';
import { getEnv } from 'environments';

export type ProductsApiFixture = {
  productsClient: ProductsApiClient;
};

export const productsApiFixture: Fixtures<ProductsApiFixture, AuthenticationFixture> = {
  productsClient: async ({ bearer }, use) => {
    const productsClient = new ProductsApiClient(await getAuthAPIContext({ token: bearer }), getEnv().apiUrl);
    
    await use(productsClient);
    }
};