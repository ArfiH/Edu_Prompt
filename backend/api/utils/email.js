import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"EduPrompt" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email - OTP",
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  });
};
