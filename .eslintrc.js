module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
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
  plugins: [
    'react',
    'react-hooks',
    'prettier',
    'import',
    'jsx-a11y',
    'no-loops',
  ],
  extends: [
    'airbnb',
    'prettier',
    'plugin:jsx-a11y/strict',
    'eslint:recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-loops/no-loops': 2,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
