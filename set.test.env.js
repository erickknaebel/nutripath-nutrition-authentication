const fs = require('fs');
const targetPath = './.env';
const colors = require('colors');
const dotnenv = require('dotenv');
dotnenv.config();

const testConfig = `
    APP_HOST = http://localhost
    APP_PORT = 3000
    API_VERSION = v1
    SECRET_KEY = b60264f
    TOKEN_EXP = 1h
    NODE_ENV = test
`;

console.log(colors.magenta('The file `.env` will be written as: \n'));
console.log(colors.grey(testConfig));
fs.writeFile(targetPath, testConfig, function (err) {
    if (err) {
        throw console.error(err);
    } else {
        console.log(colors.magenta(`.env file generated at ${targetPath} \n`));
    }
});