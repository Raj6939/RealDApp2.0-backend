const express = require('express');
const {createUser, getUserUnapproved,getUserApproved} = require('../controllers/createUserController');
const router = express.Router();

router.post('/create_user',createUser);

router.get('/get_user_unapproved/:id',getUserUnapproved);

router.get('/get_user_approved/:id',getUserApproved)



module.exports = router;