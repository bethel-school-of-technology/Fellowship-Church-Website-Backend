const crypto = require('crypto');
const User = require('../sequelize');

require('dotenv').config();

const nodemailer = require('nodemailer');

module.exports = (app) => {
  app.post('/forgotPassword', (req, res) => {
    if (req.body.email === '') {
      res.status(400).send('email required');
    }
    console.error(req.body.email);
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user === null) {
        console.error('email not in database');
        res.status(403).send('email not in db');
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        user.update({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000,
        });

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
          },
        });

        const mailOptions = {
          from: 'fellowshipchurchproject@gmail.com',
          to: `${user.email}`,
          subject: 'Link To Reset Password',
          text:
            'Howdy! You are receiving this message because you requested the reset of the password to your account.\n\n'
            + 'Please click on the following link, or paste into your browser. The link is good for one hour after receiving it:\n\n'
            + `http://localhost:3003/reset/${token}\n\n`
            + 'If you did not make this request, no action is required.\n',
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
      }
    });
  });
};