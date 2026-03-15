import { TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export async function addSystemInfo(testInfo: TestInfo) {

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const testName = testInfo.title.replace(/\s+/g, '-');
    const browserName = testInfo.project.name;
    const status = testInfo.status ?? 'running';


    // Attach timestamp to Playwright report
    testInfo.attachments.push({
        name: 'Execution Info',
        contentType: 'text/plain',
        body: Buffer.from(`Test Name: ${testName}\nBrowser: ${browserName}\nStatus: ${status}\nExecuted at: ${timestamp}`, 'utf-8'),
    });

    // const htmlReportDir = path.join('reports', 'html-reports-${testName}-${timestamp}');
    // const allureResultsDir = path.join('reports', 'allure-results-${testName}-${timestamp}');


    const htmlReportDir = path.join('reports', `html-reports-${testName}-${timestamp}`);
    const allureResultsDir = path.join('reports', `allure-results-${testName}-${timestamp}`);


    fs.mkdirSync(htmlReportDir, { recursive: true });
    fs.mkdirSync(allureResultsDir, { recursive: true });



    //fs.mkdirSync(path.dirname(htmlReportDir), { recursive: true });
    //fs.mkdirSync(path.dirname(allureResultsDir), { recursive: true });

    // Add same info to Allure environment.properties

    const envFilePath = path.join(allureResultsDir, 'environment.properties');
    const info = `TestName=${testName}\nBrowser=${browserName}\nExecutedAt=${timestamp}\n`;

    fs.writeFileSync(envFilePath, info)


    console.log(`Report folders created:
         HTML: ${htmlReportDir}
         Allure: ${allureResultsDir}`)


}