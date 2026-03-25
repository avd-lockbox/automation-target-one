import { automationConfig } from '@lockbox/eslint-config/automation';
import { vitestConfig } from '@lockbox/eslint-config/vitest';

export default [
  ...automationConfig,
  ...vitestConfig,
];
