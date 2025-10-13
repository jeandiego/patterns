import boundaries from 'eslint-plugin-boundaries'

export default {
  plugins: { boundaries },
  settings: {
    'boundaries/include': ['src/**/*'],
    'boundaries/elements': [
      {
        mode: 'full',
        type: 'assets',
        pattern: ['src/assets/**/*'],
      },
      {
        mode: 'full',
        type: 'app',
        capture: ['_', 'fileName'],
        pattern: ['src/app/**/*'],
      },
      {
        mode: 'full',
        type: 'pages',
        capture: ['featureName'],
        pattern: ['src/pages/*', 'src/pages/*/**'],
      },
      {
        mode: 'full',
        type: 'layouts',
        pattern: ['src/layouts/**/*'],
      },
      {
        mode: 'full',
        type: 'features',
        capture: ['featureName', 'folderName'],
        pattern: ['src/features/*/**/*'],
      },
      {
        mode: 'full',
        type: 'shared',
        pattern: ['src/shared/**/*'],
      },
      {
        mode: 'full',
        type: 'mock',
        pattern: ['src/__mocks__/**/*'],
      },
    ],
  },
  rules: {
    'boundaries/no-unknown': ['error'],
    'boundaries/no-unknown-files': ['error'],
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          {
            from: ['app'],
            allow: ['assets', 'app', 'pages', 'features', 'layouts', 'shared'],
          },
          {
            from: ['pages'],
            allow: ['assets', ['pages', { featureName: '${from.featureName}' }], 'layouts', 'features', 'shared'],
          },
          {
            from: ['layouts'],
            allow: ['assets', 'layouts', 'features', 'shared'],
          },
          {
            from: ['features'],
            allow: [['features', { featureName: '${from.featureName}' }], 'shared'],
          },
          {
            from: ['shared'],
            allow: ['assets', 'shared', ['features', { folderName: 'interfaces' }]],
          },
          {
            from: ['mock'],
            allow: [['features', { folderName: '__mocks__/**' }], 'mock'],
          },
        ],
      },
    ],
  },
}
