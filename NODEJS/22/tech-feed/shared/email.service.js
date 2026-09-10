require('dotenv').config();
const nodemailer = require('nodemailer');

const config = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_SECRET
    }
};

exports.sendEmail = async (to, subject, body) => {
    let transporter = nodemailer.createTransport(config);

    const emailObj = {
        from: "geral@padel.com",
        to: to,
        subject: subject,
        html: body
    };

    try {
        await transporter.sendMail(emailObj);
    }
    catch (err){
        console.log(err)
    }
}