import { PlaywrightTestConfig, devices } from '@playwright/test';
import { getEnv } from './environments';

const ENV = process.env.ENV;

if (!ENV || ![`qa`, `dev`, `stage`].includes(ENV)) {
    console.log(`Please provide a correct environment value like "npx cross-env ENV=qa|dev|stage"`);
    console.log('Default env will be used. qa!');
    process.env.ENV = 'qa';
  }

const ReportPortalConfig = {
    apiKey: 'playwright-typescript-template_WBGJ087BSnGXcybY3Ersu0CQCla_UpL3zCFBA1GPB2ANFQO6f-NLnQ8m7s0-OvVn',
    endpoint: 'https://demo.reportportal.io/api/v1',
    project: 'default_personal',
    launch: 'Playwright TypeScript Test Launch',
    attributes: [
      {
        key: 'Optional Launch Attribute #1',
        value: 'Optional Launch Attribute #1 Value',
      },
      {
        value: 'Optional Launch Attribute #2 Value',
      },
    ],
    description: 'Playwright TypeScript Test Launch Description',
    mode: 'DEFAULT', // DEFAULT or DEBUG - where launches will be stored in Report Portal
    uploadTrace: false,
    uploadVideo: false,
    includeTestSteps: true,
    debug: true
  };

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {

  testDir: './tests',

  /* Maximum time one test can run for. */
  timeout: 60 * 1000,

  expect: {

    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  reporter: [
    ['@reportportal/agent-js-playwright', ReportPortalConfig],
    ['dot'],
    ['line'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: './junit-results/results.xml' }] 
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: 'on',
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: getEnv().url,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    headless: false,

    acceptDownloads: true
  },

  //grep: [new RegExp(process.env.TAGS)],

  /* Configure projects for major browsers */
  projects: [
    {
        name: `Chrome`,
        use: {
          // Configure the browser to use.
          browserName: `chromium`,
  
          //Chrome Browser Config
          channel: `chrome`,
  
          //Picks Base Url based on User input
          baseURL: getEnv().url,
  
          //Browser Mode
          headless: false,
  
          viewport: null,

          ignoreHTTPSErrors: true,
  
          //Enable File Downloads in Chrome
          acceptDownloads: true,
  
          //Artifacts
          screenshot: `only-on-failure`,
          video: `retain-on-failure`,
          trace: `retain-on-failure`,
  
          //Slows down execution by ms
          launchOptions: {
            slowMo: 0,
            args: ['--start-maximized']
          }
        },
      }
    ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
