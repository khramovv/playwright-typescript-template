import { FullConfig } from '@playwright/test';
import { writeFileSync } from 'fs';
import { TestLinkHelper } from 'utils/common/test.link.helper';

async function globalSetup(config: FullConfig) {
    console.log('Global Setup...');
    writeFileSync(TestLinkHelper.testLinkStatisticsFilePath, ` *** Starting Tests Execution at '${new Date()} ***'\n\n`, { flag: 'w' });
}

export default globalSetup;