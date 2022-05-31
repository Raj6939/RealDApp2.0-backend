const {propertyModel} = require('../models/propertySchema.js');
const transferPropertyModel = require('../models/transferpropertySchema.js');
const userModel = require('../models/userSchema'); 
const html = require('./email.js');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rakeshvanga2000@gmail.com',
      pass: 'bwruecuimjhvuyrk'
    }
  })



const propertytransfer = async(req,res) => {
  const buyer_metamask = req.body.obj.buyer_metamask_address;
  const buyer_email = req.body.obj.buyer_email;
  const buyer_name = req.body.obj.buyer_name;
  const prop_id = req.body.obj.prop_id;
  const seller_details = await userModel.find({metamask_address:req.body.obj.seller_metamask_address});
  const notification = new transferPropertyModel({
    buyer_metamask_address:buyer_metamask,
    seller_metamask_address:seller_details[0].metamask_address,
    buyer_email:buyer_email,
    buyer_name:buyer_name,
    seller_email:seller_details[0].email,
    prop_id:prop_id
  })

  var mailOptions = {
    from: 'rakeshvanga2000@gmail.com',
    to: seller_details[0].email,
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
            <p class='center'><h3>Hi ${seller_details[0].name} </h3></p>
            <p class='colored'>
            You have one customer interested in your propertym. 
            </p>
            <p>See who<br></p><br>
            <a href="https://real-dapp-blog.herokuapp.com/" style="text-decoration:none;
        width: 150px; padding: 15px;font-weight: MEDIUM; background:#767c6e; color: teal; 
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

  notification.save();

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  
  });

res.send("ok");
};

const property_approved_buyer = async(req,res) => {
    
}

const sendNotifications = async(req,res) => {
    const address = req.params.metamask_address;
    const data = await transferPropertyModel.find({seller_metamask_address:address});
    console.log(data);
    if(data==null){
        res.send("No Notifications");
    }else{
        res.send(data);
    }
}

module.exports = {
    propertytransfer,
    property_approved_buyer,
    sendNotifications
};