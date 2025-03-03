module.exports = {
  root: true,
  overrides: [
    // Настройки для TypeScript файлов
    {
      files: ['*.ts'],
      parserOptions: {
        project: [
          './tsconfig.json',
          './projects/*/tsconfig.json'  // Для библиотеки и тестового приложения
        ],
        createDefaultProgram: true
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        '@tinkoff/eslint-config-angular',
        'plugin:prettier/recommended'  // Интеграция с Prettier
      ],
      rules: {
        // Тут можно переопределить правила при необходимости
      }
    },
    // Настройки для HTML шаблонов
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:prettier/recommended'  // Интеграция с Prettier
      ],
      rules: {}
    }
  ]
};
