const express = require('express');
const properties = require('../controllers/propertyUploadController');
const router = express.Router();

router.post('/property_upload',properties.upload.single("file"),properties.propertyUpload); //property data upload to unapproved properties collection

router.get('/property_get',properties.getproperty);  //sending approved data to the user

router.get('/file/:filename',properties.download); //displaying file by specified filename

module.exports = router;