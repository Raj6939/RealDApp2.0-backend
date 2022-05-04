const {propertyModel,rawPropertyModel} = require('../models/propertySchema.js');
const fs = require('fs');
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const mongoose = require('mongoose');
require('dotenv/config'); 
const {
  GridFsStorage
} = require("multer-gridfs-storage");
const GridFSBucket = require("mongodb").GridFSBucket;

var fileName=[];

const dburl = process.env.DB_CONNECTION ;
mongoose.connect(dburl,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => {
        console.log("connected");
    })
    .catch((err) => console.log("not"));


//creating bucket
let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "uploads"
  });
});

// Storage
const storage = new GridFsStorage({
    url: dburl,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          fileName.push(filename);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
  const upload = multer({
    storage
  });

const propertyUpload = (req,res) => {

  const obj = JSON.parse(JSON.stringify(req.body));
  console.log(fileName);

    const metamask_address= obj.metamask_address;
    // const prop_id=obj.prop_id;
    const prop_area=obj.prop_area;
    const prop_house_no=obj.prop_house_no;
    const prop_landmark=obj.prop_landmark;
    const prop_city=obj.prop_city;
    const prop_state=obj.prop_state;
    const prop_price=obj.prop_price;
    const prop_document=fileName.pop();
    const prop_surveyNumber=obj.prop_surveyNumber;
    const prop_images = fileName;

    const property = new rawPropertyModel({
        metamask_address,
        // prop_id,
        prop_area,
        prop_house_no,
        prop_landmark,
        prop_city,
        prop_state,
        prop_price,
        prop_document,
        prop_surveyNumber,
        prop_images
    });

    property.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
    res.send("Hello World Post");
};

const approvedPropertyUpload = async(req,res) => {

  console.log(req.body.obj);

    const metamask_address= req.body.obj.metamask_address;
    // const prop_id=req.body.prop_id;
    const prop_area=req.body.obj.prop_area;
    const prop_house_no=req.body.obj.prop_house_no;
    const prop_landmark=req.body.obj.prop_landmark;
    const prop_city=req.body.obj.prop_city;
    const prop_state=req.body.obj.prop_state;
    const prop_price=req.body.obj.prop_price;
    const prop_document=req.body.obj.prop_document;
    const prop_surveyNumber=req.body.obj.prop_surveyNumber;
    const prop_approved = req.body.obj.prop_approved;
    const prop_reject = req.body.obj.prop_reject;

    if(prop_reject==true){
      res.send("property rejected");
    }else {

        const property = new propertyModel({
        metamask_address,
        // prop_id,
        prop_area,
        prop_house_no,
        prop_landmark,
        prop_city,
        prop_state,
        prop_price,
        prop_document,
        prop_surveyNumber,
        prop_approved,
        prop_reject
    });

   await property.save();
        
   await rawPropertyModel.deleteOne({metamask_address:metamask_address,prop_document:prop_document});
   res.send("property approved");

    }
}

const getproperty = async(req,res) => {
    const data = await propertyModel.find();
    res.send(data);
}

const download = async (req, res) => {
  bucket.find({ filename: req.params.filename }).toArray((err, files) => {
    if(!files[0] || files.length==0) {
      return res.status(200).json({
        success : false,
        message : "No files"
      })
    }
    bucket.openDownloadStreamByName(req.params.filename).pipe(res);

  })
};

const updateDetails = async(req,res) => {

    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);

    const _id = obj._id;
    const metamask_address= obj.metamask_address;
    // const prop_id=obj.prop_id;
    const prop_area=obj.prop_area;
    const prop_house_no=obj.prop_house_no;
    const prop_landmark=obj.prop_landmark;
    const prop_city=obj.prop_city;
    const prop_state=obj.prop_state;
    const prop_price=obj.prop_price;
    const prop_document=fileName;
    const prop_surveyNumber=obj.prop_surveyNumber;

    await rawPropertyModel.updateOne({_id:_id},{$set: {
      metamask_address:metamask_address,
      prop_area:prop_area,
      prop_house_no:prop_house_no,
      prop_landmark:prop_landmark,
      prop_city:prop_city,
      prop_state:prop_state,
      prop_price:prop_price,
      prop_document:prop_document,
      prop_surveyNumber:prop_surveyNumber
    }});
}

// const approved_property_update = (req,res) => {

// }

module.exports = {
    propertyUpload,
    getproperty,
    approvedPropertyUpload,
    upload,
    download,
    updateDetails,
    approved_property_update
};