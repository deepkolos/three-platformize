export default [
  {
    input: `tests/memory/memory.js`,
    output: {
      format: 'esm',
      file: `tests/memory/memory.bundle.js`,
    },
  },
  {
    input: `tests/texture/index.js`,
    output: {
      format: 'esm',
      file: `tests/texture/index.bundle.js`,
    },
  },
];
