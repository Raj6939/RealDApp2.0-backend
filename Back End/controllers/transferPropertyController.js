const {propertyModel, newpropertyModel} = require('../models/propertySchema.js');
const {sellPropertyModel, buyPropertyModel, notification} = require('../models/transferpropertySchema.js');
const userModel = require('../models/userSchema'); 
const html = require('./email.js');
var nodemailer = require('nodemailer');
const {getEthPriceNow,getEthPriceHistorical}= require('get-eth-price');
let converter = require('@accubits/currency-converter');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rakeshvanga2000@gmail.com',
      pass: 'bwruecuimjhvuyrk'
    }
  })



const requestToPropertytransfer = async(req,res) => {

    console.log(req.body);
  const buyer_metamask = req.body.obj.buyer_metamask_address;
  const buyer_email = req.body.obj.buyer_email; 
  const buyer_name = req.body.obj.buyer_name;
  const prop_id = req.body.obj.prop_id;
  const seller_details = await userModel.find({metamask_address:req.body.obj.seller_metamask_address});
  const sellproperty = new sellPropertyModel({
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

  sellproperty.save();

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
    const _id = req.body.obj
    const data = await sellPropertyModel.findOne({_id:_id});
    const raw = await notification.findOne({prop_id:data.prop_id});
    console.log(raw);
    if(raw!=null){
        if(raw.approved_status==true){
            res.send(false);
        } 
    }
    else{
        await sellPropertyModel.updateOne({_id:_id},{$set:{approved_status:true}});
        console.log(data);
    const buyProperty = new buyPropertyModel({
        buyer_metamask_address:data.buyer_metamask_address,
        seller_metamask_address:data.seller_metamask_address,
        buyer_email:data.buyer_email,
        buyer_name:data.buyer_name,
        seller_email:data.seller_email,
        prop_id:data.prop_id,
        approved_status:true
    });

    const notify = new notification({
        prop_id:data.prop_id,
        approved_status:true
    })
    
    await buyProperty.save();
    await notify.save();

    var mailOptions = {
        from: 'rakeshvanga2000@gmail.com',
        to: data.buyer_email,
        subject: 'Seller approved your interested property',
        text: 'Now you can buy it from Real DApp platform'
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      
      });

    res.send(true);
    }
    
}

const transferProperty = async(req,res) => {
    const prop_id = req.body.obj.prop_id;
    const to = req.body.obj.buyer_metamask_address;
    const data = await userModel.findOne({metamask_address:to});
    console.log(data);
    await newpropertyModel.updateOne({prop_id:prop_id},{metamask_address:to, adharNo:data.adharcardNo});
    await sellPropertyModel.deleteMany({prop_id:prop_id});
    await buyPropertyModel.deleteMany({prop_id:prop_id});
    await notification.deleteOne({prop_id:prop_id});

    var mailOptions = {
        from: 'rakeshvanga2000@gmail.com',
        to: data.email,
        subject: 'Funds credited to your account',
        text: 'Your property is transfered to buyers account and funds are credited please check the metamask wallet'
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      
      });

    res.send(true);
}

const rejectApproval = async(req,res) => {
    const _id = req.body.obj;
    const data = await sellPropertyModel.find({_id:_id});
    console.log(data);
    await sellPropertyModel.updateOne({_id:_id},{$set:{approved_status:false}});
    await buyPropertyModel.deleteOne({prop_id:data[0].prop_id});
    await notification.deleteOne({prop_id:data[0].prop_id});

    var mailOptions = {
        from: 'rakeshvanga2000@gmail.com',
        to: data[0].buyer_email,
        subject: 'Seller rejected your interested property',
        text: 'Wait for some time'
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      
      });

    res.send(true);
}

const sendSellerNotifications = async(req,res) => {
    const address = req.params.metamask_address;
    const data = await sellPropertyModel.find({seller_metamask_address:address});
    console.log(data);
    if(data==null){
        res.send("No Notifications");
    }else{
        res.send(data);
    }
}

const sendBuyerNotifications = async(req,res) => {
    const address = req.params.metamask_address;
    const data = await buyPropertyModel.find({buyer_metamask_address:address});
    console.log(data);
    if(data==null){
        res.send("No Notifications");
    }else{
        res.send(data);
    }
}

const getRealTimeEthers = async(req,res) => {

    const propInfo = await newpropertyModel.findOne({prop_id:req.body.obj})

        getEthPriceNow()
    .then( data => {
    console.log(data);
    converter.convert('USD','INR',1).then(respn=>{  
        console.log(respn)  
        let usd = (propInfo.prop_price)/(respn.value);
        var newobject;
        for(var c in data){
            newobject = data[c];
            break;
        }
        console.log(newobject.ETH);
        let eth = (usd)/(newobject.ETH.USD);
        eth = String(eth);
        res.send(eth);
    })
    });

}



module.exports = {
    requestToPropertytransfer,
    property_approved_buyer,
    sendSellerNotifications,
    sendBuyerNotifications,
    getRealTimeEthers,
    transferProperty,
    rejectApproval
};