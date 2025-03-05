module.exports = {
	root: true,
	extends: [],
	ignorePatterns: [".cache/", ".git/", ".github/", "node_modules/"],
	overrides: [
		{
			files: ["*.ts"],
			parserOptions: {
				project: ["./tsconfig.app.json"],
				createDefaultProgram: true,
			},
			extends: [
				"@tinkoff/eslint-config/app",
				"@tinkoff/eslint-config-angular",
				"@tinkoff/eslint-config-angular/rxjs",
				"@tinkoff/eslint-config-angular/promise",
				"@tinkoff/eslint-config-angular/imports",
				"@tinkoff/eslint-config-angular/unicorn",
				"@tinkoff/eslint-config-angular/html-eslint",
				"@tinkoff/eslint-config-angular/file-progress",
				"@tinkoff/eslint-config-angular/line-statements",
				"@tinkoff/eslint-config-angular/member-ordering",
				"@tinkoff/eslint-config-angular/decorator-position",
				"@tinkoff/eslint-config-angular/function-return-type",
				"plugin:@angular-eslint/recommended",
				"plugin:@typescript-eslint/recommended",
			],
			rules: {
				"@angular-eslint/directive-selector": [
					"warn",
					{
						type: "attribute",
						prefix: "app",
						style: "camelCase",
					},
				],
				"@angular-eslint/component-selector": [
					"warn",
					{
						type: "element",
						prefix: "app",
						style: "kebab-case",
					},
				],
				"@typescript-eslint/ban-types": "off",
				"@typescript-eslint/explicit-member-accessibility": [
					"warn",
					{
						accessibility: "explicit",
						overrides: {
							accessors: "explicit",
							constructors: "explicit",
							methods: "explicit",
							properties: "explicit",
							parameterProperties: "explicit",
						},
					},
				],
				"@typescript-eslint/member-ordering": [
					"error",
					{
						default: [
							"public-static-field",
							"public-instance-field",
							"public-constructor",
							"public-instance-method",
							"protected-instance-method",
							"private-static-field",
							"private-instance-field",
							"private-constructor",
							"private-instance-method"
						],
					},
				],
				"no-useless-rename": [
					"error",
					{
						ignoreDestructuring: true,
						ignoreImport: false,
						ignoreExport: false,
					},
				],
				"no-useless-constructor": "off",
				"no-useless-return": "off",
				"no-console": [
					"warn",
					{ allow: ["info", "assert", "warn", "error"] },
				],
			},
		},
		{
			files: ["*.html"],
			extends: ["plugin:@angular-eslint/template/recommended"],
			rules: {
				"prettier/prettier": ["error", { parser: "angular" }],
				"@angular-eslint/template/attributes-order": ["error"],
			},
		},
	],
};
