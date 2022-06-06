const express = require('express');
const users = require('../controllers/createUserController');
const router = express.Router();

router.post('/create_user',users.createUser);

router.get('/approved_properties/:id',users.getProperties);

router.post('/approve_user_moderator/:id', users.approve_user);

router.post('/sign_in',users.verifySign)

router.get('/unapproved_users',users.unapproved_users);

router.get('/deployed_properties/:id',users.deployedProperties);

module.exports = router;