import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    hookTimeout: 30000,
    testTimeout: 30000,
  },
  resolve: {
    alias: {
      '@services': '/home/josh/projects/value-stream-mapping-app/src/services',
    },
  },
});