import type { Page } from '@playwright/test';

/**
 * Triggers the CSV export via the PrimeNG split-button dropdown and waits
 * for the download to complete.
 *
 * @param page - The active Page from navigateToReport
 * @param downloadDir - Absolute path to save the downloaded file
 * @returns Absolute path to the downloaded CSV file
 */
export async function downloadReportCsv(
    page: Page,
    downloadDir: string,
): Promise<string> {
    throw new Error('downloadReportCsv not yet implemented');
}
