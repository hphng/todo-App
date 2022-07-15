require('dotenv').config();

const express = require('express');
const router = express.Router();
const db = require('../services/database.js');
const Model = require('../models/index.models.js');
const {createUser, updateUser, deleteUser, 
    displayAuthUser, getAllUser, getUserbyID,
    getUsersandTasks}= require('../controller/user.controller');

const {authUser, authenticateToken} = require('../controller/authenticate.controller')

router.route('/')
    .get(getAllUser)

router.route('/register')
    .post(createUser)

router.route('/login')
    .post(authUser)
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
