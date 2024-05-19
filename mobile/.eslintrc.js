module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // we don't care that .js files contain JSX code
    'react/jsx-props-no-spreading': 'off', // HOCs should have prop spreading
    'react-hooks/rules-of-hooks': 'error', // part of react hooks
    'react-hooks/exhaustive-deps': 'warn', // part of react hooks
  },
};
