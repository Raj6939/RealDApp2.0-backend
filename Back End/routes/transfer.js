const express = require('express');
const transfer = require('../controllers/transferPropertyController.js');
const router = express.Router();

router.post('/request_to_transfer',transfer.requestToPropertytransfer);

router.post('/property_approval',transfer.property_approved_buyer);

router.post('/transfer_property',transfer.transferProperty);

router.post('/reject_approval',transfer.rejectApproval);

router.get('/seller_notifications/:metamask_address',transfer.sendSellerNotifications);

router.get('/buyer_notifications/:metamask_address',transfer.sendBuyerNotifications);

router.post('/get_eth',transfer.getRealTimeEthers);

module.exports = router;