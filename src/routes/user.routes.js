require('dotenv').config();

const express = require('express');
const router = express.Router();
const db = require('../services/database.js');
const Model = require('../models/index.models.js');
const {createUser, updateUser, deleteUser, 
    displayAuthUser, getAllUser, getUserbyID}= require('../controller/user.controller');

const {AuthUser, authenticateToken} = require('../controller/authenticate.controller')

const {getUsersandTasks} = require('../controller/tasks&users.controller')
router.route('/')
    .post(createUser)
    .get(getAllUser)

router.route('/login')
    .post(AuthUser)
    .get(authenticateToken, displayAuthUser)

router.route('/all')
    .get(getUsersandTasks)

router.route('/:id')
    .delete(deleteUser)
    .get(getUserbyID)
    .patch(updateUser)


// router.get('/posts', authenticateToken, async(req, res, next) =>{
// })


module.exports = router;
