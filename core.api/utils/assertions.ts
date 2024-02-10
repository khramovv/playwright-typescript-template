import { expect, test, APIResponse } from '@playwright/test';

export const validateStatusCode = async (response: APIResponse, expected: number): Promise<void> => {
  const message: string = `Checking that actual status code ${response.status()} for API "${response.url()}" is equal to ${expected}`;
  await test.step(message, async () => {
    console.debug(message);
    expect(response.status(), `Actual '${response.status()}': Expected '${expected}'`).toBe(expected);
  });
};

export const validateStatusCodeExtra = async (response: APIResponse, expected: number): Promise<void> => {
  const message: string = `Checking that 
  actual response status code '${response.status()}' equal to expected '${expected}' 
  for url '${response.url}' 
  with response message '${JSON.stringify(await response.json())}'`;
  await test.step(message, async () => {
    console.debug(message);
    expect(response.status(), `Actual '${response.status()}': Expected '${expected}'`).toBe(expected);
  });
};