// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['react-compiler'],
  ignorePatterns: ['/dist/*'],
  rules: {
    'react-compiler/react-compiler': 'error',
  },
};
