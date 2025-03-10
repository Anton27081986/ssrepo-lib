module.exports = {
	root: true,
	extends: [],
	ignorePatterns: [".cache/", ".git/", ".github/", "node_modules/"],
	overrides: [
		{
			files: ["*.ts"],
			parserOptions: {
				project: ["./tsconfig.json"],
				createDefaultProgram: true,
			},
			extends: [
				"plugin:@angular-eslint/recommended",
				"plugin:@typescript-eslint/recommended",
				"@tinkoff/eslint-config/app",
				"@tinkoff/eslint-config-angular",
				"@tinkoff/eslint-config-angular/rxjs",
				"@tinkoff/eslint-config-angular/promise",
				"@tinkoff/eslint-config-angular/unicorn",
				"@tinkoff/eslint-config-angular/html-eslint",
				"@tinkoff/eslint-config-angular/file-progress",
				"@tinkoff/eslint-config-angular/line-statements",
				"@tinkoff/eslint-config-angular/member-ordering",
				"@tinkoff/eslint-config-angular/decorator-position",
				"@tinkoff/eslint-config-angular/function-return-type",
			],
			rules: {
				'import/no-unresolved': 'off',
				'import/extensions': 'off',
				"import/no-relative-packages": "off",
				"@typescript-eslint/ban-types": "off",
				"@typescript-eslint/consistent-type-imports": "off",
				"@typescript-eslint/explicit-member-accessibility": [
					"warn",
					{
						accessibility: "explicit",
						overrides: {
							accessors: "explicit",
							methods: "explicit",
							properties: "explicit",
							parameterProperties: "explicit",
						},
					},
				],
				"@typescript-eslint/member-ordering": [
					"error",
					{
						"default": {
							"memberTypes": [
								// Статические члены
								"public-static-field",    // Публичные статические свойства
								"protected-static-field", // Защищённые статические свойства
								"private-static-field",   // Приватные статические свойства
								"public-static-method",   // Публичные статические методы
								"protected-static-method",// Защищённые статические методы
								"private-static-method",  // Приватные статические методы

								// Поля экземпляра
								"public-field",           // Публичные поля
								"protected-field",        // Защищённые поля
								"private-field",          // Приватные поля

								// Конструктор
								"constructor",

								// Методы экземпляра
								"public-method",          // Публичные методы
								"protected-method",       // Защищённые методы
								"private-method",         // Приватные методы

								// Геттеры и сеттеры
								"public-get",             // Публичные геттеры
								"protected-get",          // Защищённые геттеры
								"private-get",            // Приватные геттеры
								"public-set",             // Публичные сеттеры
								"protected-set",          // Защищённые сеттеры
								"private-set"             // Приватные сеттеры
							],
							"order": "as-written"       // Порядок "как написано" в духе Airbnb
						}
					}
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
