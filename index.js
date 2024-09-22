const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


// Middleware to parse JSON form data
app.use(bodyParser.json());

// Set up the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Example: Gmail SMTP service
  auth: {
    user: 'mayowaandrews723@gmail.com', // your Gmail address
    pass: process.env.GMAIL_PASS,  // your Gmail password or app-specific password
  },
});

// POST route to handle contact form submissions
app.post('/sendmail', async (req, res) => {
  const { name, email, message } = req.body; // Get form data from request body

  // Email options
  const mailOptions = {
    from: email, // Sender's email (from contact form)
    to: 'your_email@gmail.com', // Your email to receive the contact messages
    subject: `New Contact Form Submission from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
  };

  try {
    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    // Respond to the client
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render homepage
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs file
});
//Define a route to render about page
app.get("/about-us", (req, res) =>{
    res.render('about-us')
})
//Define a route to render contact
app.get('/contacts', (req, res) => {
    res.render('contacts');
});
//Define a route to render causes
app.get('/causes', (req, res) => {
    res.render('causes'); // Render the index.ejs file
});
// Define a route to render image gallery page.
app.get('/gallery', (req, res) =>{
    res.render('gallery')
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});