const express = require('express');
const {createUser, getUserApproved, approve_user} = require('../controllers/createUserController');
const router = express.Router();

router.post('/create_user',createUser);

router.get('/get_user_approved/:id',getUserApproved);

router.post('/approve_user_moderator/:id', approve_user);



module.exports = router;