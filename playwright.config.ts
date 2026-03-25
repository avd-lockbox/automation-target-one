import { defineConfig } from '@playwright/test';
import path from 'node:path';

export default defineConfig({
    use: {
        baseURL: process.env.TARGET_URL ?? 'http://localhost:4200',
        viewport: { width: 1920, height: 1080 },
        headless: true,
    },
    timeout: 30_000,
    testDir: './tests',
    outputDir: './test-results',
});

// Exported for use by shared download utility
export const downloadDir = path.resolve(
    process.env.DOWNLOAD_DIR ?? './downloads',
);
