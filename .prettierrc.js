module.exports = {
  ...require('@tinkoff/prettier-config'),
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'angular'
      }
    }
  ]
};
