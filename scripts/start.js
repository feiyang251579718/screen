const shell = require('shelljs');
const yParser = require('yargs-parser');

const argv = process.argv.slice(2);

const start = (_apps) => {
  shell.exec(`umi dev ${argv.join(' ')}`, {
    async: true,
  });
};

start();
