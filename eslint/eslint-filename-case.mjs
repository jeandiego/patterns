import path from 'node:path'

const filenameCaseRule = {
  name: 'filename-case',
  rules: {
    'filename-case': {
      create(context) {
        const options = context.options[0] || {}
        const ignoreFiles = options.ignoreFiles || []

        return {
          Program(node) {
            const filename = context.filename
            const basename = path.basename(filename)
            const extension = path.extname(basename)
            const name = basename.replace(extension, '')

            if (
              ignoreFiles.some((pattern) => filename.includes(pattern)) ||
              ['index', 'playwright.config'].includes(name)
            ) {
              return
            }

            const camelCaseRegex = /^[a-z]+[A-Z]/

            if (camelCaseRegex.test(name)) {
              context.report({
                node,
                message: `Filename '${basename}' should not use camelCase. Instead use kebab-case`,
              })
            }
          },
        }
      },
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Prevent camelCase filenames',
          recommended: true,
        },
        schema: [
          {
            type: 'object',
            properties: {
              ignoreFiles: {
                type: 'array',
                items: { type: 'string' },
              },
            },
            additionalProperties: false,
          },
        ],
      },
    },
  },
}

const recommended = {
  plugins: { 'filename-case': filenameCaseRule },
  rules: {
    'filename-case/filename-case': [
      'error',
      {
        ignoreFiles: ['index.ts', 'App.tsx'],
      },
    ],
  },
}

const filenameCasePlugin = {
  filenameCaseRule,
  recommended,
}

export default filenameCasePlugin
