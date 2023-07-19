module.exports = {
  env: {
    node: true,
  },
  extends: ['@croquiscom/eslint-config/requiring-type-checking'],
  ignorePatterns: ['.eslintrc.cjs', 'lib'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'import/export': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: __dirname,
      },
    },
  },
};
