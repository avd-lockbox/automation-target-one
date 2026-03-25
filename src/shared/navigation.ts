import type { BrowserContext, Page } from '@playwright/test';

/**
 * Navigates to the reports index, clicks the card for the given reportId,
 * and waits for the report data table to be visible.
 *
 * @param browserContext - The Playwright BrowserContext from ExecutionContext
 * @param baseUrl - Target application base URL (from context.credentials.url)
 * @param reportId - Report identifier matching the URL segment (e.g. 'claims', 'ar')
 * @returns The Page, ready for filter/download interaction
 */
export async function navigateToReport(
    browserContext: BrowserContext,
    baseUrl: string,
    reportId: string,
): Promise<Page> {
    throw new Error(`navigateToReport not yet implemented for reportId="${reportId}"`);
}
