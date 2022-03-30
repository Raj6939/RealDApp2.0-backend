const express = require('express');
const {propertyUpload, getproperty,approvedPropertyUpload, upload, download} = require('../controllers/propertyUploadController');
const router = express.Router();

router.post('/property_upload',upload.single("file"),propertyUpload);

router.get('/property_get',getproperty);

router.get('/file/:name',download);

router.get('/property_upload_blockchain',approvedPropertyUpload);

module.exports = router;