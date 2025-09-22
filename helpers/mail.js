import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const {EMAIL_USER, EMAIL_PSWD} = process.env;

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PSWD
    }
});

const sender = {
    address: "hello@example.com",
    name: "Mailtrap Test",
};
const recipients = [
    "test@mail.com",
];

transport
    .sendMail({
        from: sender,
        to: recipients,
        subject: "You are awesome!",
        text: "Congrats for sending test email with Mailtrap!",
        category: "Integration Test",
        sandbox: true
    })
    .then(console.log, console.error);

const sendEmail = payload => {
    const email = {...payload, from: sender.address};
    return transport.sendMail(email);
}

export default sendEmail;


// TODO: Закінчити