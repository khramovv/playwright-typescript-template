import { test, APIRequestContext, APIResponse } from '@playwright/test';
import { AuthenticationAPIRoutes } from 'core.api/clients/endpoints/auth.routes';
import { APIClient } from 'core.api/clients/base/api.client';
import { LoginRequest } from 'core.api/contracts/auth/login.request';
import { getDefaultAPIContext } from 'core.api/clients/base/context/default.context';
import { validateStatusCode } from 'core.api/utils/assertions';
import { ApiWrapper } from 'core.api/utils/api.wrapper';
import { getEnv } from 'environments';

export class AuthenticationApiClient implements APIClient {
  
  constructor(public context: APIRequestContext, baseUrl?: string) {
    this.baseUrl = baseUrl || getEnv().apiUrl;
  }

  baseUrl: string;

  async authorize(data: LoginRequest): Promise<String> {
    const stepName = `Getting token for user with name '${data.username}' and password '${data.password}'`;

    return await test.step(stepName, async () => {
      const response: APIResponse = await ApiWrapper.post(this, AuthenticationAPIRoutes.AuthLogin, { data });

      await validateStatusCode(response, 200);

      return (await response.json()).token;
    });
  }
}

export const getAuthenticationApiClient = async (): Promise<AuthenticationApiClient> => {
  const defaultContext = await getDefaultAPIContext();
  return new AuthenticationApiClient(defaultContext, getEnv().apiUrl);
};