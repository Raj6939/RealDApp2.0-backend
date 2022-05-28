const {propertyModel} = require('../models/propertySchema.js');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rakeshvanga2000@gmail.com',
      pass: 'Xyzzspoon@123'
    }
  })



const propertytransfer = async(req,res) => {
    var mailOptions = {
  from: 'rakeshvanga2000@gmail.com',
  to: req.body.email,
  subject: 'Someone want to buy your project',
  text: '<button><a href="https://localhost:8080/">Click here</a></button>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
};

module.exports = propertytransfer;