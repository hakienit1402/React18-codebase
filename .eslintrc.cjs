/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      typescript: {
        project: ["./tsconfig.json"],
      },
    },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "import", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    "import/order": [
      "warn",
      {
        groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
  },
  overrides: [
    {
      files: ["src/**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {},
      rules: {},
    },
    {
      files: ["**/*.config.ts", "vite.config.ts", "vitest.config.ts", "**/*.stories.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {},
      rules: {
        // Allow hooks in Storybook story render functions
        "react-hooks/rules-of-hooks": "off",
      },
    },
    {
      files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
      parser: "espree",
    },
  ],
  ignorePatterns: [
    "dist",
    "node_modules",
    "storybook-static",
    "coverage",
    "deploy/env.template.js",
  ],
};
