import { automationConfig } from '@lockbox/eslint-config/automation';
import { vitestConfig } from '@lockbox/eslint-config/vitest';

export default [
    ...automationConfig,
    ...vitestConfig,
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // TypeScript handles module resolution — .js extensions pointing to .ts files are correct
            // for nodenext module resolution and are not missing imports.
            'n/no-missing-import': 'off',
            // Allow _-prefixed variables and arguments to be intentionally unused (stub pattern).
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },
];
