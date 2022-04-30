const express = require('express');
const {propertyUpload, getproperty,approvedPropertyUpload, upload, download, updateDetails} = require('../controllers/propertyUploadController');
const router = express.Router();

router.post('/property_upload',upload.single("file"),propertyUpload); //property data upload to unapproved properties collection

router.get('/property_get',getproperty);  //sending approved data to the user

router.get('/property_upload_blockchain',approvedPropertyUpload); 

router.get('/file/:filename',download); //displaying file by specified filename

router.post('/approved_property_upload',approvedPropertyUpload); //property data upload to approved properties collection

router.post('/property_update',updateDetails); //updating property details

module.exports = router;