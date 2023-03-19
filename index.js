const express = require("express")
require('dotenv').config()
const nodemailer = require("nodemailer")
const cors = require("cors")
const bodyparser = require("body-parser")
const twilio = require('twilio')


const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

const accountSid = 'ACc55e26fc1e2089e8f9de6f7fdda069d8';
const authToken = '90146faf76590efe1cfa522fb84dcfc5';
const client = twilio(accountSid, authToken);

app.get("/", (req, res) => {
    res.send("This is web service that sends  email and whatsapp to client when he signup to service.")

})

app.post("/sendmail", async (req, res) => {


    try {



        // code to send mail by node mailer
        let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: "vipparjapatji@gmail.com",
                pass: "xrblpneaxkkntuno"
            }
        });
        let info = await transporter.sendMail({
            from: '"Vipul kumar" <vipparjapatji@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "New user has signed up. ✔", // Subject line
            text: "body of the mail", // plain text body
            html: `<p> Happy to inform you that one more used is signed up for our servie with email id ${req.body.email} and password ${req.body.password}. <br/> Phone number is ${req.body.phone} </p>`, // html body
        });



        //   code to send whatsapp message by twilio api

        const accountSid = process.env.ASID;
        const authToken = process.env.TOKEN;



        await client.messages
            .create({
                body: ` Happy to inform you that one more used is signed up for our servie with email id ${req.body.email} and password ${req.body.password}. <br/> Phone number is ${req.body.phone} `,
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+918307949189'
            })
        res.json({ sent: true });
    } catch (e) {
        console.log(e);
        res.json({ sent: false })
    }


})



app.listen(process.env.PORT, () => {
    console.log("listening on port " + (process.env.PORT));
})

