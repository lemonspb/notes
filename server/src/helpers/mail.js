// import { createTransport, createTestAccount, getTestMessageUrl } from 'nodemailer';

// async function getTransporter() {
//   let transporter;
//     const testAccount = await createTestAccount();
//     transporter = createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       secure: false,
//       auth: {
//         user: testAccount.user,
//         pass: testAccount.pass,
//       },
//     });

//   return transporter;
// }

// // eslint-disable-next-line import/prefer-default-export
// export async function sendMail(mail) {
//   // If there is no sender in payload, set default sender
//   const payload = mail;
//   if (!payload.from) {
//     payload.from = DEFAULT_MAIL_SENDER;
//   }

//   // Create transporter
//   const transporter = await getTransporter();

//   // Send mail
//   const mailInfo = await transporter.sendMail(payload);

//   // If in development mode, console.log the preview url.
//   if (true)
//     // eslint-disable-next-line no-console
//     console.log(`Mail Preview URL is ${getTestMessageUrl(mailInfo)}`);
//   }

//   // Return mail response
//   return mailInfo;
// }
