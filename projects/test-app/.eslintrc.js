module.exports = {
	root: true,
	extends: [
		// '@tinkoff/eslint-config',
		// '@tinkoff/eslint-config-angular'
	],
	ignorePatterns: ['.cache/', '.git/', '.github/', 'node_modules/'],
	overrides: [
		{
			files: ['*.ts'],
			parserOptions: {
				project: ['./tsconfig.app.json', './tsconfig.spec.json'],
				createDefaultProgram: true
			},
			extends: [
				'@tinkoff/eslint-config',
				'@tinkoff/eslint-config-angular',
				'plugin:@angular-eslint/recommended',
				'plugin:@typescript-eslint/recommended'
			],
			rules: {
				'@angular-eslint/directive-selector': [
					'warn',
					{
						type: 'attribute',
						prefix: 'app',
						style: 'camelCase',
					},
				],
				'@angular-eslint/component-selector': [
					'warn',
					{
						type: 'element',
						prefix: 'app',
						style: 'kebab-case',
					},
				],
				// '@typescript-eslint/no-explicit-any': ['off'],
				 //'@typescript-eslint/member-ordering': 0,
				// '@typescript-eslint/naming-convention': 0,
				// '@angular-eslint/no-host-metadata-property': 'off',
				// '@angular-eslint/no-output-on-prefix': 'off',
				'import/no-unresolved': 'off',
				'@typescript-eslint/ban-types': 'off',
				 '@typescript-eslint/no-inferrable-types': 'off',
			}
		},
		{
			files: ['*.html'],
			extends: ['plugin:@angular-eslint/template/recommended'],
			rules: {
				'prettier/prettier': ['error', { parser: 'angular' }]
			}
		}
	]
};
