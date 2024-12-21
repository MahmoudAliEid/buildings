const nodeMailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
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
    const info = await transporter.sendMail(message);
    return await info;
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    throw new Error("Email could not be sent");
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error(`Unhandled promise rejection: ${error.message}`);
  process.exit(1);
});

module.exports = sendEmail;
