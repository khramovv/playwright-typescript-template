import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.debug('Global Teardown...');
}

export default globalTeardown;
