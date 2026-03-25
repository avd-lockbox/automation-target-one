// Namespace re-exports — each module surfaces as its own named object to avoid
// metadata/execute name collisions across the six report modules.
// Runtime loads modules individually via import() on their dist/ bundles.
export * as claimsReport from './automations/download-claims-report.js';
export * as encountersReport from './automations/download-encounters-report.js';
export * as arReport from './automations/download-ar-report.js';
export * as remittanceReport from './automations/download-remittance-report.js';
export * as denialsReport from './automations/download-denials-report.js';
export * as priorAuthsReport from './automations/download-prior-auths-report.js';
