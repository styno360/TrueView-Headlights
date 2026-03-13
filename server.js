const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, vehicle, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"TrueView Contact Form" <${process.env.MAIL_USER}>`,
      to: "trueviewrestoration@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Inquiry from TrueView Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Vehicle:</strong> ${vehicle}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

    res.status(200).json({ success: true });

  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
