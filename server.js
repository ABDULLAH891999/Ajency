const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path'); // Include the path module

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the HTML file from the root directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/send-email', (req, res) => {
  const { name, phone, email, message } = req.body;

  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
      user: 'pixelperfectagency856@gmail.com', // Your email
      pass: 'Agency1122334455', // Your email password
    },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: 'pixelperfectagency856@gmail.com', // Your email
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error while sending email');
    }
    console.log('Email sent: ' + info.response);
    res.send('Email sent successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
