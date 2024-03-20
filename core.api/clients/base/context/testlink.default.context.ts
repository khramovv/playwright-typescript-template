import { request } from '@playwright/test';
import { TestLinkConfig } from 'playwright.config';

export const getDefaultAPIContext = async () => {
  return await request.newContext({
    baseURL: TestLinkConfig.apiResrUrl,
    extraHTTPHeaders: {
      APIKEY: TestLinkConfig.apiKey,
      Accept: '*/*',
      'Content-Type': 'application/json',
    }
  });
};