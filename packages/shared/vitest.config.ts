import { defineConfig } from 'vitest/config';

/**
 * vitest config para @ds/shared.
 * Habilita resolución ESM-style de imports .js -> .ts (estándar TS con
 * "moduleResolution: Bundler").
 */
export default defineConfig({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.test.ts'],
  },
});
