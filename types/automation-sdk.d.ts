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
    /** Platform retry limit. Defaults to 2 if omitted. */
    maxRetries?: number;
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
    /** The page opened by newPage(). Undefined until newPage() is called — pass this Page to navigateToReport, applyDateFilter, and downloadReportCsv. */
    readonly page: Page | undefined;
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

/**
 * Artifact types from the observability spec.
 * NOTE: spec says 'PLAYWRIGHT_TRACE' — using 'PLAYWRIGHT_TRACE' here to match;
 * verify against runtime before Phase 2 adds DOM_SNAPSHOT/VIDEO/DATA usage.
 */
export type ArtifactType =
    | 'FILE'
    | 'SCREENSHOT'
    | 'PLAYWRIGHT_TRACE'
    | 'HAR'
    | 'DOM_SNAPSHOT' // Phase 2: WRITE/COMPOUND mutation evidence
    | 'VIDEO' // Phase 2
    | 'DATA'; // Phase 2

/**
 * Failure categories from the retry policy and failure taxonomy spec.
 */
export type ErrorCategory =
    | 'AUTH_FAILURE'
    | 'SESSION_EXPIRED'
    | 'ELEMENT_NOT_FOUND'
    | 'TIMEOUT'
    | 'TARGET_UNAVAILABLE'
    | 'RATE_LIMITED'
    | 'NETWORK_ERROR'
    | 'DATA_VALIDATION'
    | 'UNKNOWN';

export interface ExecutionResult {
    outcome: 'SUCCESS' | 'PARTIAL_SUCCESS' | 'NO_DATA' | 'FAILURE';
    message?: string;
    error?: {
        category: ErrorCategory;
        retryable: boolean;
        detail?: string;
    };
}
