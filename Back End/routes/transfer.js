const express = require('express');
const transfer = require('../controllers/transferPropertyController.js');
const router = express.Router();

router.post('/transfer_property',transfer.propertytransfer);

router.post('/property_approval',transfer.property_approved_buyer);

router.get('/notifications/:metamask_address',transfer.sendNotifications);

module.exports = router;