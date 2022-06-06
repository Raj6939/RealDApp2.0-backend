const express = require('express');
const home = require('../controllers/dashboardController');
const router = express.Router();

router.get('/marketplace',home); //displaying all approved properties

module.exports = router;