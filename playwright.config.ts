
import { defineConfig, devices } from '@playwright/test';
const date = new Date();
const formattedDate = date.toISOString().split('T')[0];
const time = date.toTimeString().split(' ')[0].replace(/:/g, '-');

//const isHeadless = process.env.HEADLESS === 'true';

export default defineConfig({
    // testDir: './src/API',
    testDir: './src/tests',
    timeout: 30000,
    retries: 0,

    // fullyParallel: true, //  Enables parallel execution
    reporter: [
        ['list'],
        ['html', { outputFolder: `reports/html-report-${formattedDate}_${time}`, open: 'never' }], //  HTML report
        ['allure-playwright', { outputFolder: `reports/allure-results-${formattedDate}_${time}`}],      // Allure report
    ],

    use: {
       // headless: process.env.HEADLESS === 'true',
        headless: false,
        viewport: null,
        screenshot :'on',
        //screenshot: 'only-on-failure',
        video: 'on',
        //video: 'retain-on-failure',
        trace: 'retain-on-failure',
        baseURL: 'https://automationexercise.com',
        contextOptions: {
            ignoreHTTPSErrors: true,
            permissions: [],
        },
        //  Global timeout for all tests
        //globalTimeout: 60000,
        //  Global setup file     

    },

    //  Cross-browser configuration
    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //     name: 'Firefox',
        //     use: { ...devices['Desktop Firefox'] },

        // },
        // {
        //     name: 'WebKit',
        //     use: { ...devices['Desktop Safari'] },
        // },
    ],
});

