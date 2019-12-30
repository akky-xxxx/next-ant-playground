// eslint-disable no-unused-vars
const OFF = 0
const WARN = 1
const ERROR = 2
// eslint-enable no-unused-vars

module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "prettier",
    "import",
  ],
  extends: [
    "prettier",
  ],
  rules: {
    "import/prefer-default-export": OFF,
    "import/extensions": [
      "error",
      {
        "js": "never",
        "ts": "never",
      }
    ],
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
        ],
      },
    },
  },
}
