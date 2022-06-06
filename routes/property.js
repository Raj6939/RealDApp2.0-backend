const express = require('express');
const properties = require('../controllers/propertyUploadController');
const router = express.Router();

router.post('/property_upload',properties.upload.single("file"),properties.propertyUpload); //property data upload to unapproved properties collection

router.get('/existing_property_get/:metamask_address',properties.getExistingDBProperty);  //sending existingDB data to the user

router.get('/deployed_property_get/:metamask_address',properties.getDeployedProperties); //sending nfts or deployed properties to the user

router.post('/set_prop_price/:id',properties.setprice); //sets price of the properties

router.get('/file/:filename',properties.download); //displaying file by specified filename

router.post('/addnft/:id',properties.addnft);  //adding property details as nft in mongodb 

router.post('/set_price_Nft/:id',properties.setpriceNFT) // set price after deployment of nft
module.exports = router;