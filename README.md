# nodemailer-bash

A basic command line interface for sending emails with [Nodemailer](https://nodemailer.com/).

[![npm version](https://img.shields.io/npm/v/nodemailer-bash)](https://www.npmjs.com/package/nodemailer-bash)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

    npm install -g nodemailer-bash
    
## Getting started

#### Usage

    nodemailer <from> <to> [options]

#### Options

Alias | Option | Description | Default 
---- | ---- | ---- | ----
-V | --version | Output the version number of nodemailer-cli and nodemailer. | 
-h | --host | The SMTP host. | env.MAIL_SMTP
-r | --port | The port to use when contacting the SMTP server. | 587
-s | --secure |  True for 465, false for other ports. | false
-u | --user | The SMTP username to use when authenticating. | env.MAIL_USER
-p | --pass | The plain-text password to use when authenticating. | env.MAIL_PASSWORD
-j | --subject | The string to be used as the emails subject. | 
-t | --text | The plaintext message body. |
-m | --html | The html version of text message body. |
no alias | --attachments <name, file...> | Add attachment. | 
no alias | --help | Display help for command. | 

#### Adding attachment
For sending attachments with your email, use ``--attachments <filename, filepath>``. You need to pass a filename with the file extension, like this:

    --attachments name.jpg C:\file.jpg name2.pdf C:\file2.pdf
    
#### Sending email to multiple contacts
If you want to send an email to more than one contact, use ``nodemailer <send@test.com> <receiver1@test.com> <receiver2@test.com> <receiver3@test.com> ...``. The first email address should be the sender, and all the others will be the receivers.

    nodemailer send@test.com receiver1@test.com receiver2@test.com -t "Hello Everyone!"
    
#### Custom sender name
To customize your name when sending an email, use ``nodemailer "Name Foo<send@test.com>"``.

## .ENV Variables
To use the enviroment variables, you must create a ``.env`` file in your project with the content below:

- **MAIL_USER**: The username to use when authenticating.
- **MAIL_PASSWORD**: The password to use when authenticating.
- **MAIL_SMTP**: The hostname of the SMTP server to be used.

## License

[MIT](https://opensource.org/licenses/MIT)
