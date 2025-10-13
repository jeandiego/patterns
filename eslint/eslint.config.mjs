import js from '@eslint/js'
import globals from 'globals'

import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import pluginQuery from '@tanstack/eslint-plugin-query'

import boundariesPlugin from './packages/eslint/eslint-plugin-boundaries.mjs'
import jsxA11yPlugin from './packages/eslint/eslint-plugin-jsx-a11y.mjs'
import reactPlugin from './packages/eslint/eslint-plugin-react.mjs'
import importPlugin from './packages/eslint/eslint-plugin-import.mjs'
import prettierPlugin from './packages/eslint/eslint-plugin-prettier.mjs'
import reactHooks from './packages/eslint/eslint-plugin-react-hooks.mjs'
import defaultRules from './packages/eslint/eslint-default-rules.mjs'
import filenameCasePlugin from './packages/eslint/eslint-filename-case.mjs'

export default tseslint.config(
  {
    ignores: ['dist', 'dev-dist', '**/!(playwright).config.{ts,js,mjs,cjs}', '.pnp.{ts,js,mjs,cjs}'],
  },
  {
    extends: [
      defaultRules,
      reactHooks,
      reactPlugin,
      importPlugin,
      prettierPlugin,
      boundariesPlugin,
      jsxA11yPlugin,
      js.configs.recommended,
      tseslint.configs.recommended,
      filenameCasePlugin.recommended,
      ...pluginQuery.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.serviceworker, ...globals.browser },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: { ecmaFeatures: { jsx: true, tsx: true } },
    },
    plugins: { 'react-refresh': reactRefresh },
    settings: { react: { version: 'detect' } },
  },
  prettierPluginRecommended,
)
