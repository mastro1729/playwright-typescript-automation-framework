import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';


test.describe('Persistent Context Tests', () => {

    test('Open Google.com and check title', async () => {
        const userDataDir = './user-data';

        // Launch persistent context

        const context = await chromium.launchPersistentContext(userDataDir, {
            headless: false,
            args: ['--incognito', '--start-maximized'],
           // viewport: null
        });


        const page = await context.newPage();
        await page.goto('https://www.google.com');

        // Validate title
        const title = await page.title();
        console.log('Page title:', title);
        expect(title).toContain('Google');

        await context.close();
    });

});