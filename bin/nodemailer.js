#!/usr/bin/env node

require = require('esm')(module /*, options */);
const program = require('commander');
const pkg = require('../package.json');
const nodemailerPkg = require('nodemailer/package.json');
const index = require('../src/index');

program
  .version('v'+pkg.version+' | '+'nodemailer v'+nodemailerPkg.version)
  .usage('<from> <to> [options]')
  .option('-h, --host <host>', 'The SMTP host.')
  .option('-r, --port <port>', 'The port to use when contacting the SMTP server (default 587)', 587)
  .option('-s, --secure', 'True for 465, false for other ports (default false)', false)
  .option('-u, --user <user>', 'The SMTP username to use when authenticating')
  .option('-p, --pass <pass>', 'The plain-text password to use when authenticating')
  .option('-j, --subject <subject>', 'The string to be used as the emails subject')
  .option('-g, --text <text>', 'The plaintext message body')
  .option('-t, --html <html>', 'The html version of text message body')
  .option('--attachments <name, file...>', 'Add attachment')
  .parse(process.argv);

index.cli(program.opts(), program.args);