const nodemailer = require("nodemailer");
const badRequest = require("../middlewares/badRequestError");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      type: process.env.TYPE,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS,
      },
    });

    return await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: subject,
      html: text,
    });
  } catch (err) {
    throw badRequest("Something went wrong");
  }
};
