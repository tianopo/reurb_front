import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default {
    extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@tanstack/eslint-plugin-query/recommended",
        "eslint:recommended"
    ],
    plugins: [
        "react",
        "react-hooks",
        "@typescript-eslint",
        "jsx-a11y",
        "@tanstack/query"
    ],
    parser: tsParser,
    parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module"
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    globals: {
        ...globals.browser,
        ...globals.node
    },
    rules: {
        "jsx-a11y/alt-text": ["error", {
            elements: ["img", "object", "area", "input[type='image']"],
            img: ["Image"]
        }],
        "max-lines": ["error", { max: 200 }],
        "no-duplicate-imports": "error",
        "no-duplicate-case": "error",
        "no-empty-pattern": "error",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "no-console": "warn",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-useless-constructor": "off",
        "no-unexpected-multiline": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            ignoreRestSiblings: true
        }],
        "no-restricted-syntax": ["warn", {
            selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(warn|error)$/]",
            message: "Remove console.log statements"
        }],
        "@tanstack/query/exhaustive-deps": "error",
        "@tanstack/query/no-rest-destructuring": "warn",
        "@tanstack/query/stable-query-client": "error"
    }
};
