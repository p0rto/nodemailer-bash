import mailer from './mailer';
import formatter from './helpers/formatter';

export function cli(options, args) {
  options.from = args.shift();
  options.to = args;

  if (options.secure) {
    options.port = 465;
  }

  options.attachments = formatter.parseArrayIntoPairs(options.attachments);
  options.attachments = formatter.formatArrayToAttachmentsObject(options.attachments);

  mailer(options);  
}