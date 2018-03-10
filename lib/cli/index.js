const program = require('commander')
const brain = require('../brain')

program
  .version('0.0.1-alpha')
  .option('-i, --install [name]', 'Install package with a specific version [name] ex: node:9.8.0')
  .option('-r, --remove [name]', 'Remove package [name]')
  .parse(process.argv);

if (program.install) brain.install(program.install)
if (program.remove) brain.remove(program.remove)
