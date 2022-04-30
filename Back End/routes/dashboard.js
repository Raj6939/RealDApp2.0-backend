const express = require('express');
const {home,displayAllUnapprovedProperties} = require('../controllers/dashboardController');
const router = express.Router();

router.get('/',home); //displaying all approved properties
 
router.get('/unapproved_properties',displayAllUnapprovedProperties); //displaying all properties to moderator

module.exports = router;