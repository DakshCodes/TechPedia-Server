const nodemailer = require('nodemailer');

const EmailHandler = async (email, link, number) => {
    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your SMTP server address
            port: 587,              // Replace with the appropriate port (587 for TLS)
            secure: false,          // Set to true for SSL/TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const message = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: number === 1 ? "Account verification" : "Password Reset",
            text: "Welcome",
            html: `
            <div>
            <a href=${link}>Click here to ${number === 1 ? `activate your account` : `reset your password`}</a>
            </div>`
        }
        const info = await transporter.sendMail(message);

        console.log("message is sending 99%")
        console.log('Message sent: %s', info.messageId);

    } catch (error) {
        console.log("Email Not Sent");
        console.log(error)
    }



}

module.exports = EmailHandler;