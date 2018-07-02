const program = require('commander')
const brain = require('../brain')

program
    .version("0.0.2-alpha")

program
    .command('install [name]')
    .description('Install one or more packages')
    .option("-b, --branch [branch]", "Choose which branch to install from default is master")
    .action(brain.install)

program
    .command('remove [name]')
    .description('Remove one or more packages')
    .action(brain.remove)


program.on('command:*', function() {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});

program.parse(process.argv)
