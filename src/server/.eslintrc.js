// eslint-disable no-unused-vars
const OFF = 0
const WARN = 1
const ERROR = 2
// eslint-enable no-unused-vars

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "prettier",
    "import",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  rules: {
    "no-console": OFF,
    "import/prefer-default-export": OFF,
    "import/extensions": [
      "error",
      {
        "js": "never",
        "ts": "never",
      }
    ],
    "@typescript-eslint/camelcase": OFF,
    "@typescript-eslint/explicit-member-accessibility": OFF,
    "@typescript-eslint/explicit-function-return-type": OFF,
    "prettier/prettier": [
      ERROR,
      {
        printWidth: 120,
        semi: false,
        trailingComma: "all",
      }
    ]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [
          ".js",
          ".ts",
        ],
      },
    },
  },
}
