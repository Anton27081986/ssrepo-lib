module.exports = {
	root: true,
	extends: [],
	ignorePatterns: [".cache/", ".git/", ".github/", "node_modules/"],
	overrides: [
		{
			files: ["*.ts"],
			parserOptions: {
				project: ["./tsconfig.lib.json"],
				createDefaultProgram: true,
			},
			extends: [
				"@tinkoff/eslint-config",
				"@tinkoff/eslint-config-angular",
				"plugin:@angular-eslint/recommended",
				"plugin:@typescript-eslint/recommended",
			],
			rules: {
				"@angular-eslint/directive-selector": [
					"warn",
					{
						type: "attribute",
						prefix: "ss",
						style: "camelCase",
					},
				],
				"@angular-eslint/component-selector": [
					"warn",
					{
						type: "element",
						prefix: "ss",
						style: "kebab-case",
					},
				],
				"import/order": "off",
				"@typescript-eslint/no-unresolved": "off",
				"@typescript-eslint/ban-types": "off",
				"@typescript-eslint/no-inferrable-types": "off",
			},
		},
		{
			files: ["*.html"],
			extends: ["plugin:@angular-eslint/template/recommended"],
			rules: {
				"prettier/prettier": ["error", { parser: "angular" }],
			},
		},
	],
};
