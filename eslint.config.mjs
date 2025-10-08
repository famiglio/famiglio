import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import nodeDependencies from 'eslint-plugin-node-dependencies';
import packageJson from 'eslint-plugin-package-json';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';
import cspellConfigs from '@cspell/eslint-plugin/configs';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';

/**
 * Rules overrides for javascript/typescript imports/exports
 * These plugins must be imported in the plugins section:
 * @example
 * ```ts
 * import importPlugin from 'eslint-plugin-import';
 * import simpleImportSort from 'eslint-plugin-simple-import-sort'
 * ```
 * @example
 * ```plaintext
 * import: importPlugin,
 * 'simple-import-sort': simpleImportSort,
 * ```
 */
const rulesImportsExports = {
  'sort-imports': 'off',
  'simple-import-sort/imports': [
    'error',
    {
      groups: [
        ['^dotenv', '^@dotenvx/dotenvx'],
        // Node.js built-ins
        [
          '^assert',
          '^buffer',
          '^child_process',
          '^cluster',
          '^console',
          '^constants',
          '^crypto',
          '^dgram',
          '^dns',
          '^domain',
          '^events',
          '^fs',
          '^http',
          '^https',
          '^inspector',
          '^module',
          '^net',
          '^os',
          '^path',
          '^perf_hooks',
          '^process',
          '^punycode',
          '^querystring',
          '^readline',
          '^repl',
          '^stream',
          '^string_decoder',
          '^timers',
          '^tls',
          '^tty',
          '^url',
          '^util',
          '^v8',
          '^vm',
          '^zlib',
          '^node:',
        ],
        [String.raw`^\u0000`], // side effects
        ['^[^@./]', String.raw`^@\w`], // third-party
        ['^react$', '^react-dom$', '^react'],
        ['^@mui', '^@material-ui', '^@tabler'],
        ['^(@famiglio|@dcdavidev)(/.*|$)', String.raw`^\.\.?/`], // internal + relative
        [
          String.raw`^.+\.s?css$`,
          String.raw`^.+\.(png|jpe?g|gif|webp|svg)$`,
          String.raw`^.+\.(mp3|wav|ogg)$`,
          String.raw`^.+\.(mp4|avi|mov)$`,
        ],
      ],
    },
  ],
  'simple-import-sort/exports': 'error',
};

/**
 * Rules overrides for javascript/typescript
 * These plugins must be imported in the plugins section:
 * @example
 * ```ts
 * import tseslint from 'typescript-eslint';
 * import unicorn from 'eslint-plugin-unicorn';
 * import jsdoc from 'eslint-plugin-jsdoc';
 * import prettierPlugin from 'eslint-plugin-prettier';
 * ```
 * @example
 * ```json
 * {
 * plugins: {
 * jsdoc,
 * prettier: prettierPlugin,
 * },
 * extends: [
 * js.configs.recommended,
 * tseslint.configs.recommended,
 * unicorn.configs.recommended,
 * ],
 * }
 * ```
 */
const rulesJavascript = {
  // TS: allow unused prefixed with "_"
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
  ],

  // --- QUOTE CONFLICT RESOLUTION ---
  quotes: 'off',
  '@typescript-eslint/quotes': 'off',
  semi: 'off',
  '@typescript-eslint/semi': 'off',

  // --- Unicorn ---
  'unicorn/filename-case': ['error', { case: 'kebabCase' }],
  'unicorn/prefer-module': 'error',
  'unicorn/no-new-buffer': 'error',
  'unicorn/no-instanceof-array': 'error',
  'unicorn/prefer-includes': 'error',
  'unicorn/prefer-string-replace-all': 'error',
  'unicorn/prefer-type-error': 'error',
  'unicorn/throw-new-error': 'error',
  'unicorn/no-null': 'off',
  'unicorn/prevent-abbreviations': 'off',
  'unicorn/explicit-length-check': 'warn',

  // --- JSDoc ---
  'jsdoc/require-jsdoc': [
    'warn',
    {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
      },
    },
  ],
  'jsdoc/require-description': 'warn',

  // --- Prettier ---
  'prettier/prettier': 'error',
};

/**
 * @typedef {import("eslint").Linter.Config[]}
 */
export default defineConfig([
  globalIgnores(
    [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/out-tsc/**',
      '**/coverage/**',
      '**/.next/**',
      '**/.nuxt/**',
      '**/.svelte-kit/**',
      '**/.turbo/**',
      '**/.pnpm/**',
      '**/.npm/**',
      '**/.yarn/**',
      '**/.pnp/**',
      '**/package-lock.json',
      '**/pnpm-lock.yaml',
      '**/yarn.lock',
      '**/bun.lockb',
    ],
    'Node / JS / TS build & lock files'
  ),
  globalIgnores(
    [
      '**/__pycache__/**',
      '**/*.pyc',
      '**/*.pyo',
      '**/.mypy_cache/**',
      '**/.pytest_cache/**',
      '**/.tox/**',
      '**/.ruff_cache/**',
      '**/.venv/**',
      '**/venv/**',
      '**/env/**',
      '**/.ipynb_checkpoints/**',
    ],
    'Python environments and cache'
  ),
  globalIgnores(
    ['**/target/**', '**/.cargo/**', '**/Cargo.lock'],
    'Rust build artifacts'
  ),
  globalIgnores(
    [
      '**/go.sum',
      '**/go.work',
      '**/go.work.sum',
      '**/vendor/**',
      '**/.gopath/**',
      '**/.cache/go-build/**',
    ],
    'Go dependencies and cache'
  ),
  globalIgnores(
    [
      '**/*LICENSE*',
      '**/*.log',
      '**/.cache/**',
      '**/.temp/**',
      '**/.tmp/**',
      '**/.DS_Store',
      '**/.idea/**',
      '**/.vscode/**',
      '**/.nx/**',
      '**/.cspell/**',
      '**/.cursor/**',
      '**/.history/**',
      '**/.terraform/**',
      '**/.devcontainer/**',
      '**/.direnv/**',
      '**/.editorconfig',
      '**/.eslintcache',
      '**/.babelrc',
      '**/.prettier*',
      '**/.sass-cache/**',
      '**/.gradle/**',
      '**/.docker/**',
      '**/.kube/**',
      '**/.git/**',
      '**/.svn/**',
      '**/.hg/**',
      '.github/instructions/nx.instructions.md',
    ],
    'Miscellaneous project artifacts'
  ),
  globalIgnores(
    [
      '**/*:Zone.Identifier',
      '**/Thumbs.db',
      '**/desktop.ini',
      '**/$RECYCLE.BIN/**',
      '**/System Volume Information/**',
      '**/pagefile.sys',
      '**/swapfile.sys',
      '**/hiberfil.sys',
    ],
    'Windows system artifacts'
  ),

  // --- cSpell ---
  cspellConfigs.recommended,

  // --- Js/Ts ---
  {
    files: ['**/*.{js,ts,cjs,cts,mjs,mts,jsx,tsx}'],
    plugins: {
      jsdoc,
      prettier: prettierPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      nodeDependencies.configs['flat/recommended'],
      unicorn.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...rulesImportsExports,
      ...rulesJavascript,
    },
  },
  {
    files: ['**/*.{cjs,cts}', '**/webpack.config.{js,cjs}'],
    languageOptions: {
      globals: {
        ...globals.commonjs,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
  {
    files: ['**/*.{js,ts,mjs,mts,jsx,tsx}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.es2022,
      },
    },
  },

  // --- Json ---
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
    languageOptions: { parser: jsoncParser },
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: ['json/recommended'],
    languageOptions: { parser: jsoncParser },
  },
  {
    files: ['**/*.jsonc', '**/tsconfig*.json', '**/.vscode/**/*.json'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
    languageOptions: { parser: jsoncParser },
  },
  {
    files: ['**/package.json'],
    plugins: { json, 'package-json': packageJson },
    language: 'json/json',
    extends: [packageJson.configs.recommended],
    languageOptions: { parser: jsoncParser },
    rules: {
      'package-json/order-properties': 'error',
      'package-json/sort-collections': 'error',
      'package-json/require-description': 'error',
      'package-json/require-bugs': 'error',
      'package-json/require-keywords': 'error',
      'package-json/require-name': 'error',
      'package-json/require-version': 'error',
      'package-json/valid-description': 'error',
      'package-json/valid-license': 'error',
      'package-json/valid-name': 'error',
      'package-json/valid-package-definition': 'error',
      'package-json/valid-version': 'error',
    },
  },

  // --- Markdown ---
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },
  {
    files: ['**/*.md/*.js', '**/*.md/*.ts', '**/*.md/*.jsx', '**/*.md/*.tsx'],
    rules: { ...rulesImportsExports },
  },

  // --- Prettier fixes ---
  prettierConfigRecommended,
]);
