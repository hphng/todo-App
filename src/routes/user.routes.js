require('dotenv').config();

const express = require('express');
const router = express.Router();
const db = require('../services/database.js');
const Model = require('../models/index.models.js');
const {createUser, updateUser, deleteUser, 
    displayAuthUser, getAllUser, getUserbyID}= require('../controller/user.controller');
const jwt  = require('jsonwebtoken');

const {AuthUser, authenticateToken} = require('../controller/authenticate.controller')

router.route('/')
    .post(createUser);


router.route('/')
    .get(getAllUser);


router.route('/:id')
    .delete(deleteUser)
    .get(getUserbyID)
    .patch(updateUser)


router.route('/login')
    .post(AuthUser);


router.route('/login/get')
    .get(authenticateToken, displayAuthUser);
    
// router.get('/posts', authenticateToken, async(req, res, next) =>{
// })


module.exports = router;
