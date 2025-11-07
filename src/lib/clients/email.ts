import nodemailer from "nodemailer";

export const emailClient = nodemailer.createTransport({
  host: "smtp.Gmail.com",
  port: 587,
  secure: false,
  auth: {
    pass: process.env.EMAIL_APP_TOKEN,
    user: process.env.EMAIL_APP_ADDRESS,
  },
});
