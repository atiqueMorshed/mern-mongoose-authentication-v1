import nodemailer from 'nodemailer';
import { sendEmailOptions } from './typeDefinitions';

const sendEmail = (options: sendEmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.message,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    console.log(err ? err : info);
  });
};
export default sendEmail;
