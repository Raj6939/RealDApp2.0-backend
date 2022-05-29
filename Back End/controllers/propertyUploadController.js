const {propertyModel,newpropertyModel} = require('../models/propertySchema.js');
const fs = require('fs');
const multer = require("multer");
const crypto = require("crypto");
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host:'ipfs.infura.io', port:5001, protocol:'https' });
const path = require("path");
const mongoose = require('mongoose');
require('dotenv/config'); 
const {
  GridFsStorage
} = require("multer-gridfs-storage");
const GridFSBucket = require("mongodb").GridFSBucket;

var fileName='';

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
        crypto.randomBytes(16, async(err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const result = await ipfs.files.add(buf);
          fileName= result[0].hash;
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
    // const metamask_address= obj.metamask_address;
    const prop_area=obj.prop_area;
    const prop_house_no=obj.prop_house_no;
    const prop_landmark=obj.prop_landmark;
    const prop_city=obj.prop_city;
    const prop_state=obj.prop_state;
    const prop_document=fileName;
    const prop_surveyNumber=obj.prop_surveyNumber;
    const adharNo = obj.adharNo;
    const deployed = false;

    const property = new propertyModel({
        prop_area,
        prop_house_no,
        prop_landmark,
        prop_city,
        prop_state,
        prop_document,
        prop_surveyNumber,
        adharNo,
        deployed
    });

    property.save()
        .then((result) => {
            console.log(result);
            res.send(true);
        })
        .catch((err) => {
            console.log(err);
            res.send(false);
        })
    
};

const setprice = async(req,res) => {

  const id = req.params.id;
  const price = req.body.obj.prop_price;
  const data = await propertyModel.updateOne({_id:id},{$set : {prop_price:price}}).then((result) => {
      res.send(true);
    }).catch((err) => {
      res.send(false);
    });

}

const addnft = async(req,res) => {
  const id = req.params.id;
  const result = await propertyModel.updateOne({_id:id},{$set:{deployed:true}});
  const data = await propertyModel.findOne({_id:id});
  const nft = new newpropertyModel({
    prop_id : req.body.obj,
    prop_area : data.prop_area,
    prop_house_no : data.prop_house_no,
    prop_landmark : data.prop_landmark,
    prop_city : data.prop_city,
    prop_state : data.prop_state,
    prop_document : data.prop_document,
    prop_surveyNumber : data.prop_surveyNumber,
    adharNo : data.adharNo,
    metamask_address : data.metamask_address,
    deployed : data.deployed
  })
  nft.save();
  res.send(nft);

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

module.exports = {
    propertyUpload,
    getproperty,
    upload,
    download,
    setprice,
    addnft
};