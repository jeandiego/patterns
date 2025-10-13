import * as importPlugin from 'eslint-plugin-import'

export default [
  {
    ...importPlugin.flatConfigs?.recommended,
    ...importPlugin.flatConfigs?.typescript,
    plugins: { import: importPlugin },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            moduleDirectory: ['node_modules', './src', './playwright'],
          },
        },
      },
    },
    rules: {
      'import/no-dynamic-require': 'warn',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
      'import/no-default-export': 'error',
      'import/no-unresolved': [2, { caseSensitive: false }],
      'import/prefer-default-export': 'off',
    },
  },
  {
    files: [
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      '*.config.cjs',
      'vite.config.*',
      'tailwind.config.*',
      '**.stories.tsx',
      '**.stories.ts',
      '**.story.tsx',
      '**.story.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
]
