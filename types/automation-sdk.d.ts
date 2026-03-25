import type { BrowserContext, Page } from '@playwright/test';

export interface AutomationMetadata {
    name: string;
    version: string;
    description: string;
    targetApplication: string;
    /** Version label validated against Target Application Registry. Use null if unversioned. */
    targetApplicationVersion: string | null;
    category: 'READ' | 'WRITE' | 'COMPOUND';
    parameters: ParameterDefinition[];
    browserContextOptions?: {
        viewport?: { width: number; height: number };
    };
    maxDurationSeconds?: number;
}

export interface ParameterDefinition {
    name: string;
    type: 'string' | 'date' | 'boolean' | 'number';
    required: boolean;
    enum?: string[];
    description?: string;
}

export interface ExecutionContext {
    readonly browserContext: BrowserContext;
    readonly credentials: ResolvedCredentials;
    readonly parameters: Readonly<Record<string, unknown>>;
    readonly logger: Logger;
    readonly artifacts: ArtifactUploader;
    step<T>(name: string, fn: (step: StepContext) => Promise<T>): Promise<T>;
}

export interface StepContext {
    /** Opens a new page within the step's browser context. Call once per step; reuse the returned Page across shared utilities. */
    newPage(): Promise<Page>;
    /** The page opened by newPage(). Available after the first call — pass this Page to navigateToReport, applyDateFilter, and downloadReportCsv. */
    readonly page: Page;
    readonly logger: Logger;
    screenshot(label?: string): Promise<void>;
}

export interface ResolvedCredentials {
    url: string;
    username?: string;
    password?: string;
    [key: string]: unknown;
}

export interface ArtifactUploader {
    upload(file: Buffer | string, options: { name: string; type: ArtifactType }): Promise<void>;
}

export interface Logger {
    info(message: string, context?: Record<string, unknown>): void;
    warn(message: string, context?: Record<string, unknown>): void;
    error(message: string, context?: Record<string, unknown>): void;
    debug(message: string, context?: Record<string, unknown>): void;
}

export type ArtifactType = 'FILE' | 'SCREENSHOT' | 'TRACE' | 'HAR';

export interface ExecutionResult {
    outcome: 'SUCCESS' | 'PARTIAL_SUCCESS' | 'NO_DATA' | 'FAILURE';
    message?: string;
    error?: {
        category: string;
        retryable: boolean;
        detail?: string;
    };
}
