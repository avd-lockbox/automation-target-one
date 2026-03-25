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
// NOTE for LAENG-30 implementer: this function owns page creation via browserContext.newPage().
// In the Navigate step, use: `page = await navigateToReport(context.browserContext, ...)` and do
// NOT call `step.newPage()` before it — that would open a second page within the same step.
export function navigateToReport(_browserContext: BrowserContext, _baseUrl: string, reportId: string): Promise<Page> {
    return Promise.reject(new Error(`navigateToReport not yet implemented for reportId="${reportId}"`));
}
