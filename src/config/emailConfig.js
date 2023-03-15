const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("./serverConfig");
console.log(EMAIL, PASSWORD);
const sender = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

module.exports = sender;
