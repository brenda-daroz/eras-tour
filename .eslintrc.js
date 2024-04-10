module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "next/core-web-vitals",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": true
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
      "@typescript-eslint/no-confusing-void-expression": "off"
    }
}
