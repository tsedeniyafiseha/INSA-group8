const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,            // SSL port
    secure: true,         // must be true for 465
    auth: {
        user: process.env.EMAIL_USER,   // your Gmail
        pass: process.env.EMAIL_PASS    // App Password
    },
    connectionTimeout: 10000, // optional
    greetingTimeout: 10000,
    socketTimeout: 10000
});

async function sendEmail({ to, subject, html, from }) {
    try {
        const info = await transporter.sendMail({
            from: from || `"SCNAS Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });
        console.log("Email sent:", info.response);
        return info;
    } catch (err) {
        console.error("Email sending failed:", err);
        throw new Error("Email sending failed");
    }
}

module.exports = { sendEmail };
