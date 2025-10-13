export default {
  '*.{js,jsx}': ['eslint --cache --fix'],
  '*.{ts,tsx}': [`eslint --cache --fix`, () => `tsc --skipLibCheck --noEmit --pretty`],
  '*.json': ['prettier --write'],
}
