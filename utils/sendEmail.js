const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_PASSWORD) {
    throw new Error("Gmail email configuration is missing");
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const message = {
    from: `${options.name} <${options.email}>`,
    to: "shimaamohamed22620@gmail.com",
    subject: options.subject,
    text: options.message,
  };

  try {
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error(`Error sending email: ${error.message}`);
        throw new Error("Email could not be sent");
      } else {
        console.log(`Email sent: ${info.messageId}`);
        return `Email sent: ${info.response}`;
      }
    });
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
