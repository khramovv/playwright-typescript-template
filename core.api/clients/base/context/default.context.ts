import { request } from '@playwright/test';
import { getEnv } from 'environments';

export const getDefaultAPIContext = async () => {
  return await request.newContext({
    baseURL: getEnv().apiUrl,
  });
}; 