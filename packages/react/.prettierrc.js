module.exports = {
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: false,
  jsxBracketSameLine: false,
  overrides: [
    {
      files: '*.mdx',
      options: {
        printWidth: 50,
      },
    },
  ],
}
