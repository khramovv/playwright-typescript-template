import { request } from '@playwright/test';
import { TestLinkConfig } from 'playwright.config';

export const getDefaultAPIContext = async () => {
console.debug(`TestLink Base API RUL: ${TestLinkConfig.apiResrUrl}`);
let baseUrl = TestLinkConfig.apiResrUrl;
return await request.newContext({
    baseURL: baseUrl,
    extraHTTPHeaders: {
      APIKEY: TestLinkConfig.apiKey,
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
  })
}; 