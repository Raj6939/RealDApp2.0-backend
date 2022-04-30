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

var fileName;

const dburl = process.env.DB_CONNECTION ;
mongoose.connect(dburl,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => {
        console.log("connected");
    })
    .catch((err) => console.log("not"));

console.log("sdjkjbjd");

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
      console.log("hi");
      console.log(file);
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          fileName=filename;
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

  console.log(req.body);
  const obj = JSON.parse(JSON.stringify(req.body));
  console.log(obj);

    console.log(obj.metamask_address);
    console.log(obj.prop_id);
    console.log(obj.prop_area);
    console.log(obj.prop_house_no);
    console.log(obj.prop_landmark);
    console.log(obj.prop_city);
    console.log(obj.prop_state);
    console.log(obj.prop_price);
    console.log(obj.prop_surveyNumber);

    const metamask_address= obj.metamask_address;
    const prop_id=obj.prop_id;
    const prop_area=obj.prop_area;
    const prop_house_no=obj.prop_house_no;
    const prop_landmark=obj.prop_landmark;
    const prop_city=obj.prop_city;
    const prop_state=obj.prop_state;
    const prop_price=obj.prop_price;
    const prop_document=fileName;
    const prop_surveyNumber=obj.prop_surveyNumber;

    // const metamask_address= req.body.props.metamask_address;
    // const prop_id=req.body.props.prop_id;
    // const prop_area=req.body.props.prop_area;
    // const prop_house_no=req.body.props.prop_house_no;
    // const prop_landmark=req.body.props.prop_landmark;
    // const prop_city=req.body.props.prop_city;
    // const prop_state=req.body.props.prop_state;
    // const prop_price=req.body.props.prop_price;
    // const prop_document=fileName;
    // const prop_surveyNumber=req.body.props.prop_surveyNumber;

    const property = new rawPropertyModel({
        metamask_address,
        prop_id,
        prop_area,
        prop_house_no,
        prop_landmark,
        prop_city,
        prop_state,
        prop_price,
        prop_document,
        prop_surveyNumber
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

const approvedPropertyUpload = (req,res) => {

    const metamask_address= req.body.metamask_address;
    const prop_id=req.body.prop_id;
    const prop_area=req.body.prop_area;
    const prop_house_no=req.body.prop_house_no;
    const prop_landmark=req.body.prop_landmark;
    const prop_city=req.body.prop_city;
    const prop_state=req.body.prop_state;
    const prop_price=req.body.prop_price;
    const prop_document=req.body.prop_document;
    const prop_surveyNumber=req.body.prop_surveyNumber;
    
    const property = new propertyModel({
        metamask_address,
        prop_id,
        prop_area,
        prop_house_no,
        prop_landmark,
        prop_city,
        prop_state,
        prop_price,
        prop_document,
        prop_surveyNumber
    });

    property.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
    res.send("Hello World Post");
}

const getproperty = async(req,res) => {
    const data = await propertyModel.find();
    res.send(data);
}

const download = async (req, res) => {
  bucket.find({ filename: req.params.name }).toArray((err, files) => {
    if(!files[0] || files.length==0) {
      return res.status(200).json({
        success : false,
        message : "No files"
      })
    }
    bucket.openDownloadStreamByName(req.params.name).pipe(res);

  })
};

const updateDetails = (req,res) => {
  // async deleteFile(filename: string) {
  //   const bucket = await this._getBucket();
  //   const documents = await bucket.find({ filename }).toArray();
  //   if (documents.length === 0) {
  //    throw new Error('FileNotFound');
  //   }
  //   return Promise.all(
  //    documents.map((doc) => {
  //     return bucket.delete(doc._id);
  //    })
  //   );
  //  }
}

module.exports = {
    propertyUpload,
    getproperty,
    approvedPropertyUpload,
    upload,
    download,
    updateDetails
};