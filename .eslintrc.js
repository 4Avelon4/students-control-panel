module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  env: {
    es6: true,
    node: true,
    browser: true,
    'jest/globals': true,
  },
  plugins: ['prettier', 'jest'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-param-reassign': [2, { props: false }],
    'no-plusplus': 'off',
    'no-restricted-syntax': [2, 'WithStatement'],
    'max-len': ['error', 120],
  },
};
