import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    console.log('Global Setup...');
}

export default globalSetup;