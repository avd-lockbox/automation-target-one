import type { Page } from '@playwright/test';

export interface DateRange {
    /** ISO date string e.g. '2025-01-01' */
    dateFrom?: string;
    /** ISO date string e.g. '2025-12-31' */
    dateTo?: string;
}

/**
 * Applies an optional date range filter using the PrimeNG DatePicker for
 * the given date field. No-ops gracefully if both dateFrom and dateTo are absent.
 *
 * @param page - The active Page from navigateToReport
 * @param dateField - The report's date field identifier (e.g. 'dateOfService')
 * @param range - Optional date range values from context.parameters
 */
export async function applyDateFilter(
    page: Page,
    dateField: string,
    range: DateRange,
): Promise<void> {
    if (!range.dateFrom && !range.dateTo) return;
    throw new Error(`applyDateFilter not yet implemented for dateField="${dateField}"`);
}
