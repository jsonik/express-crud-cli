#!/usr/bin/env node

const program = require('commander');
const lib = require('../lib/index.js');

program
    .version('0.0.1')
    .description('Route and controller creation system. Generate specific API version (route and controller)')
    .option('-f, --file <name>', 'Model file name. Only needed if model name and file name is different, and file name include symbols like _ or -')
    .option('-a, --api <version>', 'Api version (default v1)');

program
    .command('generate <model>')
    .alias('g')
    .description('model - Model name')
    .action((model) => {
        lib.generate({
            runDir: process.cwd(),
            model: model,
            version: program.api ? program.api : 'v1',
            fileName: program.file
        });
    });

program.parse(process.argv);