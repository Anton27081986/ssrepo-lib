// jshint ignore: start

const fs = require('fs');

const convertCssToScss = (filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const pattern = /var\(--([a-zA-Z0-9-_]+)\)/g;
        const convertedContent = content.replace(pattern, '#{$$' + '$1' + '}');

        fs.writeFileSync(filePath, convertedContent, 'utf-8');
        console.log('Файл успешно преобразован!');
    } catch (error) {
        console.error('Ошибка при обработке файла:', error);
    }
};

// jshint ignore: end

// Получение аргументов из командной строки
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Использование: npm run exec <путь_к_файлу>');
    process.exit(1);
}

convertCssToScss(args[0]);
