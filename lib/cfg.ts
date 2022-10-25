/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import * as path from "path";

import mergeOptions from 'merge-options';
import pkgDir from 'pkg-dir';

const CONFIG_DIR = process.env.CFG_DIR || path.join(pkgDir.sync() || '', 'configs');
const ENV = process.env.CONFIG_ENV || process.env.NODE_ENV;

let defaultConfig;
try {
    defaultConfig = require(path.join(CONFIG_DIR, 'defaults'));
} catch (err) {
    // eslint-disable-next-line
    console.warn('[cfg] Warning: could not load default config', err);
}

let environmentConfig;
try {
    if (ENV) {
        environmentConfig = require(path.join(CONFIG_DIR, ENV));
    }
} catch (err) {
    // eslint-disable-next-line
    console.warn(`[cfg] Warning: could not load ${ENV} config`, err);
}

export const cfg = mergeOptions({environment: ENV}, defaultConfig, environmentConfig);
