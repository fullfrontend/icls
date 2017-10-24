#!/usr/bin/env node
'use strict';
const descriptor = require('./package.json');
const program = require('commander');

program
    .version(descriptor.version)

program
    .command('preview <file>')
    .description('Preview the ICLS file colors')
    .option('-k, -key <key>', 'Preview for the given key')
    .action(require('./src/commands/preview'));

program
    .command('convert <file>')
    .description('Convert the given ICLS to the requested format')
    .option('-t , --template <file>', 'Define the css file template', './src/templates/tpl-%s.css')
    .option('-f , --format <format>', 'Define the output format', 'prism')
    .action(require('./src/commands/convert'));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1);
}

