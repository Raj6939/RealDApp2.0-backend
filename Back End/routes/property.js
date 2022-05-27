const express = require('express');
const properties = require('../controllers/propertyUploadController');
const router = express.Router();

router.post('/property_upload',properties.upload.single("file"),properties.propertyUpload); //property data upload to unapproved properties collection

router.get('/property_get',properties.getproperty);  //sending approved data to the user

router.post('/set_prop_price/:id',properties.setprice); //sets price of the properties

router.get('/file/:filename',properties.download); //displaying file by specified filename

router.post('/addnft/:id',properties.addnft);  //adding property details as nft in mongodb 

module.exports = router;