// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  ...expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      // Disable import plugin rules due to Node v16 compatibility issues
      // These will work properly on EAS builds which use Node 18+
      'import/no-unresolved': 'off',
      'import/first': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/export': 'off',
      'import/named': 'off',
    },
  },
]);
