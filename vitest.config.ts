import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        reporters: 'verbose',
        coverage: {
            // enabled: true,
            clean: true,
            all: true,
            reporter: ['html', 'text', 'lcov', 'json'],
            exclude: ['bin.mjs', '_snapshots_', '.eslint*', 'vitest*', '.prettier*', '**/*.test.*'],
        },
        include: ['src/**/*.test.{ts,mts}'],
        exclude: ['content/**', 'fixtures/**', 'bin.mjs', '_snapshots_'],
    },
});
