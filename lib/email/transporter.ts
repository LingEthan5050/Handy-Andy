import nodemailer from "nodemailer";

if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
  throw new Error("Email environment variables are missing.");
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});