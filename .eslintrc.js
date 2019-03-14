module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'import', 'jsx-a11y', 'no-loops'],
  extends: ['prettier', 'plugin:jsx-a11y/strict'],
  rules: {
    'prettier/prettier': 'error',
    'no-loops/no-loops': 2,
  },
};
