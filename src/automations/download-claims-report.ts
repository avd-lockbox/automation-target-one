import type { Page } from '@playwright/test';
import type { AutomationMetadata, ExecutionContext, ExecutionResult } from '../../types/automation-sdk.js';

export const metadata: AutomationMetadata = {
    name: 'download-claims-report',
    version: '0.1.0',
    description: 'Downloads the Claim Status report from automation-target-one as CSV',
    targetApplication: 'automation-target-one',
    targetApplicationVersion: null,
    category: 'READ',
    parameters: [
        { name: 'dateFrom', type: 'date',   required: false, description: 'Filter by date of service (from)' },
        { name: 'dateTo',   type: 'date',   required: false, description: 'Filter by date of service (to)' },
        { name: 'status',   type: 'string', required: false, description: 'Filter by claim status' },
        { name: 'payer',    type: 'string', required: false, description: 'Filter by payer' },
    ],
    browserContextOptions: { viewport: { width: 1920, height: 1080 } },
    maxDurationSeconds: 120,
};

export async function execute(context: ExecutionContext): Promise<ExecutionResult> {
    let page!: Page;

    await context.step('Navigate', async (step) => {
        page = await step.newPage();
        // TODO: page = await navigateToReport(context.browserContext, context.credentials.url, 'claims');
    });

    await context.step('Filter', async (step) => {
        // TODO: await applyDateFilter(page, 'dateOfService', {
        //     dateFrom: context.parameters.dateFrom as string | undefined,
        //     dateTo:   context.parameters.dateTo   as string | undefined,
        // });
    });

    await context.step('Download', async (step) => {
        // TODO: const filePath = await downloadReportCsv(page, downloadDir);
        // TODO: await context.artifacts.upload(filePath, { name: 'claims.csv', type: 'FILE' });
        // TODO: ETL integration placeholder — pass artifact ref to ETL pipeline per Platform Integration §4
    });

    return { outcome: 'SUCCESS' };
}
