import arg from 'arg';
import inquirer from 'inquirer';
import nodemailer from 'nodemailer';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
        '--host': String,
        '--port': Number,
        '--secure': Boolean,
        '--auth': Object,
        '--user': String,
        '--pass': String,
        '--from': String,
        '--to': String,
        '--subject': String,
        '--text': String, 
        '-h': '--host',
        '-r': '--port',
        '-s': '--secure',
        '-a': '--auth',
        '-u': '--user',
        '-p': '--pass',
        '-f': '--from',
        '-t': '--to',
        '-j': '--subject',
        '-g': '--text'
    },
    {
        argv: rawArgs.slice(2),
    }
  );
  
  return {
    host: args['--host'] || process.env.MAIL_HOST,
    port: args['--port'] || process.env.MAIL_PORT,
    secure: args['--secure'] || false,
    auth: args['--auth'] || false,
    user: args['--user'] || '',
    password: args['--pass'] || '',
    from: args['--from'] || 'foo@example.com',
    to: args['--to'] || 'bar@example.com',
    subject: args['--subect'] || 'Hello World',
    text: args['--text'] || 'Hi. Im just testing, ok?'
  }
}

async function promptForMissingOptions(options) {
  const defaultTemplate = 'JavaScript';

  if (options.skipPromps) {
    return {
      ...options,
      template: options.template || defaultTemplate
    }
  }

  const questions = [];
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['JavaScript', 'TypeScript'],
      default: defaultTemplate
    })
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template
  }
}


export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  console.log(options);
  // options = await promptForMissingOptions(options);
  try {
    let testAccount = await nodemailer.createTestAccount();

    console.log("Creating transport...");
  
    let transporter = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      secure: options.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      },
    });
  
    console.log("Sending e-mail...");
  
    let info = await transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text
    });

    console.log(info);
    console.log(nodemailer.getTestMessageUrl(info));
  } catch (e) {
    console.log('error', e);
  }
  
}