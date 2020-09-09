#!/usr/bin/env node

require = require('esm')(module /*, options */);
const program = require('commander');
const pkg = require('../package.json');
const nodemailerPkg = require('nodemailer/package.json');
const index = require('../src/index');

program
  .version('v'+pkg.version+' | '+'nodemailer v'+nodemailerPkg.version)
  .usage('<from> <to> [options]')
  .option('-h, --host <host>', 'the SMTP host')
  .option('-r, --port <port>', 'the port to use when contacting the SMTP server', 587)
  .option('-s, --secure', 'true for 465, false for other ports', false)
  .option('-u, --user <user>', 'the SMTP username to use when authenticating')
  .option('-p, --pass <pass>', 'the plain-text password to use when authenticating')
  .option('-j, --subject <subject>', 'the string to be used as the emails subject')
  .option('-t, --text <text>', 'the plaintext message body')
  .option('-m, --html <html>', 'the html version of text message body')
  .option('--attachments <name, file...>', 'add attachment')
  .parse(process.argv);

index.cli(program.opts(), program.args);