import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export const generateSecret = () => {
  const secret = crypto.randomBytes(20).toString("hex");
  return secret;
}

export const sendMail = (email) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
}

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "noreply@prismagram.com",
    to: address,
    subject: "Secret code for Prismagram login 🔒",
    html: `Hello! Your secret code for login is ${secret}.<br />Copy paste the code on the app/website to login`
  };
  return sendMail(email);
}