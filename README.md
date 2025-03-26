# Front Library

Angular приложение-библиотеке. Состоит из 2 проектов:

- front-components (библиотека компонента)
- test-app (старое приложение для показа компонентов)

## Локальная работа со storybook

To start a local development server, run:

1. Для запуска storybook выполнить команду в терминале
   `npm run storybook`

2. Для сборки storybook выполнить команду в терминале
   `npm run build-storybook`

## Инструкция по публикации компонента в storybook

Для разработанного ui компонента в библиотеке:

- Создать файл \*.stories.ts в папке компонента и описать на примере https://storybook.js.org/tutorials/intro-to-storybook/angular/en/simple-component/
- После завершения разработки компонента, сделать MR ветки компонента в main
- Проверить, что описание компонента появилось в storybook по адресу: https://pages-git.ssnab.it/ss-erp/front-library
