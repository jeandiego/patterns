import eslintConfigPrettier from 'eslint-config-prettier'

export default {
  rules: {
    ...eslintConfigPrettier.rules,
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        trailingComma: 'all',
        arrowParens: 'always',
        endOfLine: 'auto',
        semi: false,
        singleQuote: true,
        bracketSpacing: true,
        useTabs: false,
        plugins: ['prettier-plugin-tailwindcss'],
      },
    ],
  },
}
