import fs from 'node:fs';
import path from 'node:path';

import { defineConfig } from 'tsdown';

/**
 * @fileoverview
 * tsdown build configuration for Famiglio Core library.
 * Automatically injects and updates Apache-2.0 license headers
 * with dynamic copyright years.
 */

/**
 * Generates an Apache-2.0 license header with an auto-updated year range.
 */
function generateLicenseHeader(
  baseYear = 2025,
  author = 'Davide Di Criscito'
): string {
  const currentYear = new Date().getFullYear();
  const yearRange =
    currentYear === baseYear ? `${baseYear}` : `${baseYear}-${currentYear}`;

  return `/**
 * Copyright ${yearRange} ${author}
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */\n`;
}

/**
 * Recursively prepends the license header to all .js and .d.ts files in a directory.
 * Skips .js.map and prevents duplicate insertion.
 */
function injectLicenseHeader(outDir: string, header: string): void {
  const walk = (dir: string) => {
    for (const file of fs.readdirSync(dir)) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walk(filePath);
        continue;
      }

      // Skip source maps and non-target files
      if (
        (filePath.endsWith('.js') && !filePath.endsWith('.js.map')) ||
        filePath.endsWith('.d.ts')
      ) {
        const content = fs.readFileSync(filePath, 'utf8');
        // Normalize leading whitespace and prevent duplication
        const trimmed = content.trimStart();
        if (!trimmed.startsWith('/**') && !trimmed.startsWith('/*!')) {
          fs.writeFileSync(filePath, header + '\n' + content);
        }
      }
    }
  };
  walk(outDir);
}

/**
 * tsdown post-build plugin to inject license headers.
 */
const injectLicensePlugin = {
  name: 'inject-license-header',
  async closeBundle() {
    const header = generateLicenseHeader(2025, 'Davide Di Criscito');
    injectLicenseHeader('dist', header);
  },
};

export default defineConfig({
  entry: ['src/index.ts', 'src/logger/index.ts'],
  platform: 'node',
  format: ['esm'],
  dts: { build: true },
  clean: true,
  outDir: 'dist',
  sourcemap: true,
  outputOptions: {
    legalComments: 'inline',
  },
  plugins: [injectLicensePlugin],
});
