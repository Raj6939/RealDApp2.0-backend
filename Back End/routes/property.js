const express = require('express');
const properties = require('../controllers/propertyUploadController');
const router = express.Router();

router.post('/property_upload',properties.upload.single("file"),properties.propertyUpload); //property data upload to unapproved properties collection

router.get('/property_get',properties.getproperty);  //sending approved data to the user

router.get('/property_upload_blockchain',properties.approvedPropertyUpload); 

router.get('/file/:filename',properties.download); //displaying file by specified filename

router.post('/approved_property_upload',properties.approvedPropertyUpload); //property data upload to approved properties collection

router.put('/property_update',properties.upload.single("file"),properties.updateDetails); //updating property details

// router.put('/approved_property_update',properties.approved_property_update);  //updating approved properties

module.exports = router;