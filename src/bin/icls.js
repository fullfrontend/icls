import projectDescriptor from '../../package.json';
import program from 'commander';
import preview from '../commands/preview';
import convert from '../commands/convert';

program
    .version(projectDescriptor.version);

program
    .command('preview <file>')
    .description('Preview the ICLS file colors')
    .option('-k, -key <key>', 'Preview for the given key')
    .action(preview);

program
    .command('convert <file>')
    .description('Convert the given ICLS to the requested format')
    .option('-t , --template <file>', 'Define the css file template', './src/templates/tpl-%s.css')
    .option('-f , --format <format>', 'Define the output format', 'prism')
    .action(convert);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1);
}

