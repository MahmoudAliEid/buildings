const nodeMailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  if (
    !process.env.SMTP_EMAIL ||
    !process.env.SMTP_PASSWORD ||
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT
  ) {
    return "Email not configured";
  }
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${options.name} <${options.email}>`,
    to: "shimaamohamed22620@gmail.com",
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(message);
    const info = `Email sent: ${info.messageId}`;
    return info;
  } catch (error) {
    console.error(`Error sending email: ${error.message}`, error);
    throw new Error("Email could not be sent");
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error(`Unhandled promise rejection: ${error.message}`);
  process.exit(1);
});

module.exports = sendEmail;
