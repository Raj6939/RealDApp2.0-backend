const express = require('express');
const {createUser, getUser} = require('../controllers/createUserController');
const router = express.Router();

router.post('/create_user',createUser);

router.get('/get_user',getUser);



module.exports = router;