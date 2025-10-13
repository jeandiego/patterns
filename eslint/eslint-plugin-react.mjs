import reactPlugin from 'eslint-plugin-react'

export default {
  ...reactPlugin.configs.flat?.recommended,
  ...reactPlugin.configs.flat?.['jsx-runtime'],
  languageOptions: {
    ...reactPlugin.configs.flat?.recommended.languageOptions,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.{js,ts}'] }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-curly-brace-presence': 'error',
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/function-component-definition': ['error', { namedComponents: ['arrow-function', 'function-declaration'] }],
    'react-refresh/only-export-components': 'off',
  },
}
