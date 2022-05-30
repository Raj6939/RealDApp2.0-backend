const express = require('express');
const {propertytransfer,property_approved_buyer} = require('../controllers/transferPropertyController.js');
const router = express.Router();

router.post('/transfer_property',propertytransfer);

router.post('/property_approval',property_approved_buyer);

module.exports = router;