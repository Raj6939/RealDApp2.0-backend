const express = require('express');
const {propertytransfer} = require('../controllers/transferPropertyController.js');
const router = express.Router();

router.post('/transfer_property',propertytransfer);


module.exports = router;