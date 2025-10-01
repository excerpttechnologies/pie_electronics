import transporter from "../config/mailer.js";

export const sendContactForm = async (req, res) => {
  const { fname, lname, phone, email, message } = req.body;

  // Basic validation
  if (!fname || !lname || !phone || !email || !message) {
    return res.status(400).json({ success: false, msg: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, msg: "Invalid email format" });
  }

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ success: false, msg: "Phone must be 10 digits" });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "aravindbvadavalliki@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Request</h3>
        <p><b>Name:</b> ${fname} ${lname}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.json({ success: true, msg: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Failed to send message" });
  }
};
