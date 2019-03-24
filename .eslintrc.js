const babelModuleConfig = require('./.module-resolver.js');

const OFF = 0;
const WARN = 1;
const ERROR = 2;

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
    'react/prop-types': OFF,
    'import/no-named-as-default': OFF,
    'react/jsx-filename-extension': OFF,
    'prettier/prettier': ERROR,
    'no-loops/no-loops': ERROR,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': WARN,
    'import/prefer-default-export': WARN,
  },
  settings: {
    'import/resolver': {
      'babel-module': babelModuleConfig,
    },
  },
};
