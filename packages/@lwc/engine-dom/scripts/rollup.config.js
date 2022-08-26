/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/* eslint-env node */

const path = require('path');
const fs = require('fs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const typescript = require('../../../../scripts/rollup/typescript');
const writeDistAndTypes = require('../../../../scripts/rollup/writeDistAndTypes');
const lwcFeatures = require('../../../../scripts/rollup/lwcFeatures');
const { version } = require('../package.json');

const renderer = fs.readFileSync(path.resolve(__dirname, '../dist/renderer.js'), 'UTF-8');

const banner = `/* proxy-compat-disable */`;
const footer = `/* version: ${version} */`;
const formats = ['es', 'cjs'];

module.exports = {
    input: path.resolve(__dirname, '../src/index.ts'),

    output: formats.map((format) => {
        return {
            file: `engine-dom${format === 'cjs' ? '.cjs' : ''}.js`,
            format,
            banner: banner,
            footer: footer,
        };
    }),

    plugins: [
        nodeResolve({
            resolveOnly: [/^@lwc\//],
        }),
        typescript(),
        writeDistAndTypes(),
        lwcFeatures(),
        replace({
            values: {
                'process.env.IS_BROWSER': 'true',
                'process.env.RENDERER': renderer.replace('var renderer =', ''),
            },
            preventAssignment: true,
        }),
    ],

    onwarn({ code, message }) {
        if (!process.env.ROLLUP_WATCH && code !== 'CIRCULAR_DEPENDENCY') {
            throw new Error(message);
        }
    },
};
