import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com', 
      port: 587,
      secure: false,          
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"Task Manager" <taskmanagerwvilla@gmail.com>',
      to: email,
      subject: subject,
      text: message,
    });

    console.log('Email sent successfully:', info.response);
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Email sending failed');
  }
};

export default sendEmail;
