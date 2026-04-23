#!/usr/bin/env node
const { spawnSync } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

// Skip when running in CI or when explicitly disabled
if (process.env.CI === 'true' || process.env.LYCHEE_SYNC_SKIP === 'true') {
  console.log('[lychee-sync] Skipped in CI or by LYCHEE_SYNC_SKIP');
  process.exit(0);
}

// Ensure submodule exists; if not, try to init in local dev only
const submodulePath = join(process.cwd(), 'src', 'lib', 'lychee-sync');
if (!existsSync(submodulePath)) {
  // In CI, submodules should have been initialized by the pipeline
  console.warn('[lychee-sync] Submodule missing at', submodulePath);
  process.exit(0);
}

// Resolve executable entry within submodule
const entry = join(submodulePath, 'index.js');
if (!existsSync(entry)) {
  console.warn('[lychee-sync] Entry not found at', entry, '— skipping');
  process.exit(0);
}

const targetDir = process.argv[2] || 'static/assets/images';
console.log(`[lychee-sync] Syncing to ${targetDir}`);

const result = spawnSync(process.execPath, [entry, targetDir], {
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status || 0);
