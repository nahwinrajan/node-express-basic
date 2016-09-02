  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');
  const nodemailer = require('nodemailer');
  const port = 3000;
  let app = express();

  //set the view engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'))

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  //page index
  app.get('/', function(req, res) {
    res.render('pages/index', {
      title: "Node.js with Express",
      activePage: "index"
    });
  });

  //page index
  app.get('/about', function(req, res) {
    res.render('pages/about', {
      title: "About",
      activePage: "about"
    });
  });


  //page index
  app.get('/contact', function(req, res) {
    res.render('pages/contact', {
      title: "Contact",
      activePage: "contact"
    });
  });
  app.post('/contact/send', function(req, res) {
    let transporter = nodemailer.createTransport({
      service: 'yourSmtpServerName',
      auth: {
        user: 'your-email-address',
        pass: 'your-email-password'
      }
    });

    let mailOptions = {
      from: ' Site - Node.Js Express - Simple Site <email@address.com>',
      to: 'support@domain.com',
      subject: 'Contact Submission - Node.js + Express + nodemailer',
      text: 'User ' + req.body.name + ' sent following message: ' + req.body.message,
      html: '<p>a user sent following message</p><ul><li>Name: ' + req.body.name +
      '<li>Message: <p>' + req.body.message + '</p></li></ul>'
    };

    transporter.sendMail(mailOptions, function(err, info){
      if(err) {
        console.log('error while sending email: ' + err);
        res.render('pages/contact');
      } else {
        console.log('Message sent: ' + info.response);
        res.redirect('/');
      }

    });
  });

  app.listen(port);
  console.log('Server is running on port: ' + port);
