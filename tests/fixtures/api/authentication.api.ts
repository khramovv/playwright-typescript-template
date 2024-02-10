import { Fixtures } from '@playwright/test';
import { AuthenticationApiClient, getAuthenticationApiClient } from 'core.api/clients/controllers/auth.controller';
import { getEnv } from 'environments';

export type AuthenticationFixture = {
    authClient: AuthenticationApiClient;
    bearer: String;
};

export const authenticationFixture: Fixtures<AuthenticationFixture> = {
  authClient: async ({  }, use) => {
    const authClient = await getAuthenticationApiClient();

    await use(authClient);
  },
  bearer: async ({ authClient }, use) => {
    const bearer = await authClient.authorize({username: getEnv().adminUserName, password: getEnv().adminPassword});

    await use(bearer);

    console.info(`Logout Token ${bearer}...`);

    //await authClient.unauthorize(bearer);
  }
};