import { build } from 'esbuild';
import { readdirSync } from 'node:fs';
import { resolve, basename, extname } from 'node:path';

const isDryRun = process.argv.includes('--dry-run');

const automationsDir = resolve('src/automations');
const entryPoints = readdirSync(automationsDir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => resolve(automationsDir, f));

if (isDryRun) {
    console.log('Dry run — would build:', entryPoints.map((e) => basename(e)));
    process.exit(0);
}

await Promise.all(
    entryPoints.map((entry) =>
        build({
            entryPoints: [entry],
            outfile: `dist/${basename(entry, extname(entry))}.js`,
            bundle: true,
            platform: 'node',
            format: 'esm',
            target: 'node22',
            external: ['@playwright/test', 'playwright'],
        }),
    ),
);
