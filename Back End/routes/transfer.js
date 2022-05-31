const express = require('express');
const transfer = require('../controllers/transferPropertyController.js');
const router = express.Router();

router.post('/transfer_property',transfer.propertytransfer);

router.post('/property_approval',transfer.property_approved_buyer);

router.get('/seller_notifications/:metamask_address',transfer.sendSellerNotifications);

router.get('/buyer_notifications/:metamask_address',transfer.sendBuyerNotifications);

router.post('/get_eth',transfer.getRealTimeEthers);

module.exports = router;