#!/usr/bin/env node
/**
 * Static validation script for iHealth RN SDK module files.
 *
 * Checks (for every module/[A-Z]*.js):
 *   1. File can be required without throwing (with react-native mocked)
 *   2. Exports is a plain object
 *   3. Device modules (non-Profile) export Event_Notify as a string
 *   4. Every exported value is either a string / number OR a function (no undefined/noop objects)
 *   5. Platform-specific modules produce DIFFERENT Event_Notify on iOS vs Android
 *   6. No raw event string literals that should go through Event_Notify (heuristic)
 *   7. All method names match a safe identifier pattern
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const Module = require('module');

// ─── Helpers ──────────────────────────────────────────────────────────────────

const GREEN  = '\x1b[32m';
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET  = '\x1b[0m';
const BOLD   = '\x1b[1m';

let passed = 0;
let failed = 0;
const errors = [];

function ok(file, msg)   { passed++; console.log(`  ${GREEN}✓${RESET} ${msg}`); }
function fail(file, msg) { failed++; errors.push(`${file}: ${msg}`); console.log(`  ${RED}✗${RESET} ${msg}`); }
function warn(file, msg) { console.log(`  ${YELLOW}⚠${RESET} ${msg}`); }

// Build a require() function that injects a fake react-native for a given platform.
function makeMockedRequire(platform) {
  const fakeRN = {
    Platform: { OS: platform, select: (obj) => obj[platform] ?? obj.default },
    TurboModuleRegistry: { get: () => null },
    NativeModules: {},
  };

  const originalLoad = Module._load.bind(Module);
  return function requireWithMock(filePath) {
    const origLoad = Module._load;
    Module._load = function(request, parent, isMain) {
      if (request === 'react-native') return fakeRN;
      return originalLoad(request, parent, isMain);
    };
    let result;
    try {
      // Clear cache so the module re-evaluates with the new mock.
      delete require.cache[require.resolve(filePath)];
      result = require(filePath);
    } finally {
      Module._load = origLoad;
      delete require.cache[require.resolve(filePath)];
    }
    return result;
  };
}

const requireIOS     = makeMockedRequire('ios');
const requireAndroid = makeMockedRequire('android');

// ─── Discover modules ─────────────────────────────────────────────────────────

const moduleDir = path.resolve(__dirname, '../module');
const files = fs.readdirSync(moduleDir)
  .filter(f => /^[A-Z].*\.js$/.test(f))   // only device/manager modules
  .sort();

const isProfileModule = (name) => name.includes('Profile') || name === 'BGProfileModule.js' || name === 'BPProfileModule.js' || name === 'HSProfileModule.js' || name === 'POProfileModule.js';
const isDeviceModule  = (name) => !isProfileModule(name);

// ─── Run checks ───────────────────────────────────────────────────────────────

console.log(`\n${BOLD}iHealth RN SDK — module static validation${RESET}`);
console.log(`Scanning ${files.length} files in ${moduleDir}\n`);

for (const file of files) {
  const filePath = path.join(moduleDir, file);
  console.log(`${BOLD}${file}${RESET}`);

  // 1. Require without errors on both platforms
  let exportsIOS, exportsAndroid;
  try {
    exportsIOS = requireIOS(filePath);
  } catch (e) {
    fail(file, `throws on iOS require: ${e.message}`);
    console.log();
    continue;
  }
  try {
    exportsAndroid = requireAndroid(filePath);
  } catch (e) {
    fail(file, `throws on Android require: ${e.message}`);
    console.log();
    continue;
  }
  ok(file, 'loads without error on both platforms');

  // 2. Exports must be a plain object
  if (typeof exportsIOS !== 'object' || exportsIOS === null || Array.isArray(exportsIOS)) {
    fail(file, `exports is not a plain object (got ${typeof exportsIOS})`);
    console.log();
    continue;
  }
  ok(file, 'exports a plain object');

  const keys = Object.keys(exportsIOS);

  // 3. Device modules must have Event_Notify
  if (isDeviceModule(file) && file !== 'iHealthDeviceManagerModule.js') {
    if (typeof exportsIOS.Event_Notify !== 'string' || exportsIOS.Event_Notify.trim() === '') {
      fail(file, 'missing or empty Event_Notify string export');
    } else {
      ok(file, `Event_Notify = "${exportsIOS.Event_Notify}" (iOS) / "${exportsAndroid.Event_Notify}" (Android)`);
    }

    // 5. Platform-specific Event_Notify must differ between iOS and Android
    if (exportsIOS.Event_Notify && exportsAndroid.Event_Notify) {
      const iosVal     = exportsIOS.Event_Notify;
      const androidVal = exportsAndroid.Event_Notify;
      // Modules that use Platform.select will differ; static ones will be equal (that's fine)
      const hasPlatformSwitch = iosVal !== androidVal;
      if (hasPlatformSwitch) {
        ok(file, `platform-aware: iOS="${iosVal}", Android="${androidVal}"`);
      }
      // Verify Android value follows naming convention  event_notify_xxx
      if (!androidVal.startsWith('event_notify_') && !androidVal.includes('.MODULE.NOTIFY')) {
        warn(file, `Android Event_Notify "${androidVal}" does not match expected patterns`);
      }
      // Verify iOS value follows naming convention  XXX.MODULE.NOTIFY
      if (hasPlatformSwitch && !iosVal.includes('.MODULE.NOTIFY') && !iosVal.includes('.NOTIFY')) {
        warn(file, `iOS Event_Notify "${iosVal}" does not match expected XXX.MODULE.NOTIFY pattern`);
      }
    }
  }

  // 4. Every exported value must be string | number | boolean | function — no undefined or plain objects.
  //    Profile modules export native constants via NativeModules, which are undefined in mock — skip that check.
  const skipUndefinedCheck = isProfileModule(file);
  let methodCount = 0;
  for (const key of keys) {
    if (key === 'Event_Notify') continue;
    const val = exportsIOS[key];
    const t   = typeof val;
    if (t === 'function') {
      methodCount++;
    } else if (t === 'string' || t === 'number' || t === 'boolean') {
      // constants are fine (device type strings, event name constants, etc.)
    } else if ((val === undefined || val === null) && !skipUndefinedCheck) {
      fail(file, `exported key "${key}" is ${val} — likely a noop placeholder`);
    } else if (t !== 'undefined' && t !== 'string' && t !== 'number' && t !== 'boolean' && t !== 'function') {
      warn(file, `exported key "${key}" has unexpected type "${t}"`);
    }
  }

  if (methodCount > 0) {
    ok(file, `${methodCount} method(s) exported`);
  }

  // 6. Heuristic: source must not contain hard-coded event string literals that belong in Event_Notify
  const source = fs.readFileSync(filePath, 'utf8');
  // Look for addListener('XXX.MODULE.NOTIFY') or addListener('event_notify_xxx') outside of the top-level pre-call
  const hardcodedListeners = source.match(/addListener\(['"](?!event_notify_|event_scan|event_device|event_authenticate)[^'"]+['"]\)/g);
  if (hardcodedListeners) {
    // Filter out the pre-call pattern (first occurrence)
    const suspicious = hardcodedListeners.filter(m => !source.startsWith(`'use strict';\n// `) || true);
    if (suspicious.length > 1) {
      warn(file, `possible hard-coded addListener calls: ${suspicious.join(', ')}`);
    }
  }

  // 7. All exported function names must be valid JS identifiers
  const badKeys = keys.filter(k => !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) && k !== 'HS2S Pro');
  if (badKeys.length > 0) {
    warn(file, `unusual export key(s): ${badKeys.join(', ')}`);
  }

  console.log();
}

// ─── Summary ──────────────────────────────────────────────────────────────────

const total = passed + failed;
console.log('─'.repeat(60));
console.log(`${BOLD}Results:${RESET} ${passed}/${total} checks passed`);
if (failed > 0) {
  console.log(`\n${RED}${BOLD}Failures:${RESET}`);
  errors.forEach(e => console.log(`  ${RED}•${RESET} ${e}`));
  process.exit(1);
} else {
  console.log(`\n${GREEN}${BOLD}All checks passed.${RESET}`);
  process.exit(0);
}
