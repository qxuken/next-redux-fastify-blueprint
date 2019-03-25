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
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      project: './tsconfig.json',
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier',
    'import',
    'jsx-a11y',
    'no-loops',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'airbnb',
    'plugin:jsx-a11y/strict',
    'eslint:recommended',
  ],
  rules: {
    'react/prop-types': OFF,
    'import/no-named-as-default': OFF,
    'react/jsx-filename-extension': OFF,
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/no-use-before-define': OFF,
    'react-hooks/exhaustive-deps': WARN,
    'import/prefer-default-export': WARN,
    'prettier/prettier': ERROR,
    'no-loops/no-loops': ERROR,
    'react-hooks/rules-of-hooks': ERROR,
  },
  settings: {
    'import/resolver': {
      'babel-module': babelModuleConfig,
    },
    react: {
      version: 'detect',
    },
  },
};
