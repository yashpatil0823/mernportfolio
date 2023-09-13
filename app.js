const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyparser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
// const sendGridTransporter = require("nodemailer-sendgrid-transport");
const Contactinfo = require("./models/contactModel");
const path = require('path')

require("dotenv").config();
require("./db/conn")


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./client/build")))
app.get('/', async (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build/index.html"))
})
// const transporter = nodemailer.createTransport(
//   sendGridTransporter({
//     auth: {
//       api_key: process.env.API_SENDGRID,
//     },
//   })
// );

// app.post('/sendemail', (req, res) => {
//   const { name, email, jobtypes, message } = req.body;

//   if (!name) {
//     return res.status(400).json({ error: "Please add your name" });
//   }

//   if (!email) {
//     return res.status(400).json({ error: "Please add your email" });
//   }


//   if (!jobtypes) {
//     return res.status(400).json({ error: "Please add jobtypes" });
//   }
//   if (!message) {
//     return res.status(400).json({ error: "Please add your message" });
//   }


//   transporter.sendMail({
//     to: "yashpatil822003@gmail.com",
//     from: "yashpatil822003@gmail.com",
//     subject: "Job Offers",
//     html: `
        
//         <h5>Details Informtion:</h5>

//         <ul>
//         <li> <p>Name: ${name}</p> </li>
//         <li> <p>E-mail: ${email}</p> </li>
//         <li> <p>Job Types: ${jobtypes}</p> </li>
//         <li> <p>Message: ${message}</p> </li>


//         </ul>

//         `,

//   });

//   res.json({ success: "Your email has been sent succesfully" })

// });


app.post(`/api/v1/send/contact`, async (req, res) => {
  console.log(req.body)
  try {
    const { name, email, jobtype, message } = req.body
    const contactInfo = new Contactinfo({
      name,
      email,
      jobtype,
      message
    })

    const newInfo = await contactInfo.save()
    console.log(newInfo)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: "Gmail",
      port: 587,
      secure: false,
      auth: {
        user: "romanhulks1@gmail.com",
        pass: "hovmfhvsbnrpeoun",
      },
    });

    const mailOptions = {
      from: "yashpatil822003@gmail.com",
      to: `${email}`,
      subject: "THANK YOU FOR CONTACTING ME ",

      html: `
          
      <h5>Details Informtion:</h5>
  
      <ul>
      <li> <p>Name: ${name}</p> </li>
      <li> <p>E-mail: ${email}</p> </li>
      <li> <p>Job Types: ${jobtype}</p> </li>
      <li> <p>Message: ${message}</p> </li>

   <p>I have received your message and will reply to you as soon as possible. Your inquiry is important to me.</p>
    
    <p>Best regards,<br/>Yash Patil</p>
      </ul>

      `
    };

    const response = await transporter.sendMail(mailOptions)
    if (!response) {
      res.status(400).json({
        success: false,
        message: "EMAIL NOT SEND"
      })
    }

    res.status(200).json({
      success: true,
      message: "EMAIL SENT SUCCESSFULLY"
    })

  } catch (error) {
    res.status(500).send(error)
  }


})

app.listen(PORT, (req, res) => {
  console.log(`connected to ${PORT}`)
  console.log("Server Connected");
});


