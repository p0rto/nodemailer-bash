import nodemailer from 'nodemailer';

require('dotenv').config()

function createTransport(options) {
  let transporter = nodemailer.createTransport({
    host: options.host || process.env.MAIL_SMTP,
    port: options.port,
    secure: options.secure,
    auth: {
      user: options.user || process.env.MAIL_USER,
      pass: options.pass || process.env.MAIL_PASSWORD
    },
  });

  return transporter;
}

async function sendMail(options, transporter) {
  let info = await transporter.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments
  });

  return info;
}

export default async function send(options) {
  try {  
    const transporter = createTransport(options);
    console.info("Sending...");

    await sendMail(options, transporter);
  } catch (e) {
    console.info("Error", e);
  }
}