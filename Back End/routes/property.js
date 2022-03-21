const express = require('express');
const {propertyUpload, getproperty} = require('../controllers/propertyUploadController');
const router = express.Router();

router.post('/property_upload',propertyUpload);

router.get('/property_upload',getproperty);

module.exports = router;