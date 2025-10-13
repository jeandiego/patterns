import jsxA11y from 'eslint-plugin-jsx-a11y'

export default {
  ...jsxA11y.flatConfigs.recommended,
  languageOptions: {
    ...jsxA11y.flatConfigs.recommended.languageOptions,
  },
  rules: {
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
  },
}
