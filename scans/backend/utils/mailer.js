const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            connectionTimeout: 10000, 
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
        return info;
    } catch (err) {
        console.error("Email sending failed:", err);
        throw new Error("Email sending failed");
    }
}

module.exports = {sendEmail};
