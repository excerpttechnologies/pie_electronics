import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: "excerpt.trainings@gmail.com",
    pass: "isqo sdxr qxcs crnz",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer error:", error);
  } else {
    console.log("Server is ready to take messages:", success);
  }
});

export default transporter;
