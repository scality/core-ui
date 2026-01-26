import { defineConfig } from '@rslib/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: 'es2019',
      dts: true,
      output: {
        distPath: { root: 'dist/esm' },
      },
    },
    {
      format: 'cjs',
      syntax: 'es2019',
      output: {
        distPath: { root: 'dist/cjs' },
      },
    },
  ],
  source: {
    entry: {
      index: './src/lib/index.ts',
    },
    exclude: ['**/stories/**', '**/*.test.*'],
  },
  output: {
    target: 'web',
    externals: ['react', 'react-dom'],
  },
  plugins: [pluginReact()],
});
