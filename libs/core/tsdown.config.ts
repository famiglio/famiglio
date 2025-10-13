import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    platform: 'node',
    format: ['esm'],
    dts: false,
    clean: true,
    outDir: 'dist',
    sourcemap: true,
    outputOptions: {
      legalComments: 'inline',
    },
  },
]);
