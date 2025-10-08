/**
 * @type {import("prettier").Config}
 */
const config = {
  plugins: [
    'prettier-plugin-sh',
    'prettier-plugin-toml',
    'prettier-plugin-ini',
    'prettier-plugin-packagejson',
    'prettier-plugin-properties',
    'prettier-plugin-prisma',
  ],

  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  endOfLine: 'lf',

  overrides: [
    {
      files: ['*.toml'],
      options: {
        printWidth: 100,
      },
    },
  ],
};

export default config;
