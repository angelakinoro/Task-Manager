// utils/mailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendTaskAssignmentEmail = async (to, taskTitle, deadline) => {
  try {
    const mailOptions = {
      from: `"Task Manager" <${process.env.EMAIL_USER}>`,
      to,
      subject: "📌 New Task Assigned",
      html: `
        <h3>You have a new task assigned!</h3>
        <p><strong>Task:</strong> ${taskTitle}</p>
        <p><strong>Deadline:</strong> ${deadline ? new Date(deadline).toLocaleString() : "No deadline"}</p>
        <p>Log in to your dashboard to view and manage it.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
  }
};
