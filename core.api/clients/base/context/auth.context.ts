import { APIRequestContext, request } from '@playwright/test';
import { getAuthenticationApiClient } from 'core.api/clients/controllers/auth.controller';
import { getEnv } from 'environments';

export const getAuthAPIContext = async ({ token = undefined, user = undefined }): Promise<APIRequestContext> => {
  let extraHTTPHeaders: { [key: string]: string } = {
    accept: '*/*',
    'Content-Type': 'application/json'
  };

  if (!user && !token) {
    throw Error('Provide"user" or "token"');
  }

  if (user && !token) {
    const authClient = await getAuthenticationApiClient();
    const token = await authClient.authorize(user);

    extraHTTPHeaders = { ...extraHTTPHeaders, Authorization: `Bearer ${token}` };
  }
  if (token && !user) {
    extraHTTPHeaders = { ...extraHTTPHeaders, Authorization: token };
  }

  return await request.newContext({
    baseURL: getEnv().apiUrl,
    extraHTTPHeaders
  });
};