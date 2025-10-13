export default {
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'no-console': ['error', { allow: ['warn'] }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration',
        message:
          'Avoid using enums. Use const assertions instead. See: https://www.totaltypescript.com/why-i-dont-like-typescript-enums',
      },
    ],
  },
}
