import {
  createTransport,
  createTestAccount,
  getTestMessageUrl,
} from "nodemailer";
import env from "../helpers/env.js";

async function getTransporter() {
  let transporter;
  if (process.env.NODE_ENV !== "production") {
    const testAccount = await createTestAccount();
    transporter = createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } else {
    transporter = createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

export async function sendMail(mail) {
  const payload = {
    subject: mail.subject,
    html: mail.html,
    to: mail.to,
    from: env.MAIL_SENDER,
  };

  const transporter = await getTransporter();

  const mailInfo = await transporter.sendMail(payload);

  console.log(`Mail Preview URL is ${getTestMessageUrl(mailInfo)}`);

  return mailInfo;
}
