module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "filenames", "import", "unicorn"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "{react,react-dom/**}",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
      },
    ],
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    eqeqeq: ["error"],
    "no-duplicate-imports": [
      "warn",
      {
        includeExports: true,
      },
    ],
    "prefer-const": ["off"],
    camelcase: ["warn"],
    "no-var": ["error"],
    "no-console": ["warn"],
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "arrow-spacing": ["error"],
    "no-undef": ["error"],
    "no-unused-vars": ["error"],
    "block-scoped-var": ["error"],
    "no-regex-spaces": ["error"],
    "no-multi-spaces": ["error"],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 0,
      },
    ],
    "semi-spacing": ["error"],
  },
};
