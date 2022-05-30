const {propertyModel} = require('../models/propertySchema.js');
const {transferPropertyModel} = require("../models/transferpropertySchema.js");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rakeshvanga2000@gmail.com',
      pass: 'bwruecuimjhvuyrk'
    }
  })



const propertytransfer = async(req,res) => {
    console.log(req.body);
    var mailOptions = {
  from: 'rakeshvanga2000@gmail.com',
  to: req.body.email,
  subject: 'Someone want to buy your project',
  html: `<html>

  <head>
      <style>
          .colored {
              color: blue;
          }
  
          #body {
              background-color: #80808021
              font-size: 18px;
              border: 1px solid #80808021;
              padding:20px;
          }
  
  
          .center{
              margin: auto;
              width: 50%;
          }
         .mobile {
              display: none;
          }
          .web {
              display:block;
          } 
        
          .button {
  
          }
          
          @media only screen and (max-device-width : 640px) {
  
              /* Styles */
              .mobile {
                  display: block;
              }
              .web {
                  display:none;
              }
          }
  
          @media only screen and (max-device-width: 768px) {
  
              /* Styles */
              .mobile {
                  display: block;
              }
              .web {
                  display:none;
              }
          } 
      </style>
  </head>
  
  <body>
      <div id='body' class="center">
          <p class='center'><h3>Hi User</h3></p>
          <p class='colored'>
          You have one customer interested in your propertym. 
          </p>
          <p>See who<br></p><br>
          <a href="https://real-dapp-blog.herokuapp.com/" style="text-decoration:none;
      width: 150px; padding: 15px;font-weight: MEDIUM; background:#767c6e; color: #000000; 
      cursor: pointer;
      font-size: 110%;">Click Here</a>
  </p>
          <br/>
          <br/>
          <p>Thanks & Regards, 
          <br /> Team Real DApp</p>
      </div>
  </body>
  
  </html>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

res.send("ok");
};

module.exports = propertytransfer;