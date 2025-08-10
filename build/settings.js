export function createBuildSettings(options) {
  return {
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    tsconfig: 'tsconfig.json',
    platform: 'node',
    target: 'node24',
    mainFields: ['module', 'main'],
    loader: { '.node': 'file' },
    format: 'esm',
    bundle: true,
    minify: true,
    sourcemap: true,
    ...options,
  };
}
