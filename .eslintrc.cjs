/* eslint-env node */
module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/stylistic",
        "plugin:@stylistic/recommended-extends",
        "plugin:import/recommended",
        "plugin:import/typescript",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@stylistic", "@typescript-eslint"],
    root: true,
    rules: {
        "@stylistic/indent": ["error", 4],
        "@stylistic/indent-binary-ops": ["error", 4],
        "@stylistic/jsx-indent": ["error", 4],
        "@stylistic/jsx-indent-props": ["error", 4],
        "@stylistic/quotes": ["error", "double"],
        "import/order": ["error", {
            "alphabetize": {
                order: "asc",
            },
            "groups": ["builtin", "external"],
            "newlines-between": "always",
            "pathGroups": [
                {
                    pattern: "react",
                    group: "builtin",
                    position: "before",
                },
            ],
            "pathGroupsExcludedImportTypes": ["react"],
        }],
    },
}
