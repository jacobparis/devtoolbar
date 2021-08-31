module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig.json',
  },

  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['react', '@typescript-eslint'],
}
