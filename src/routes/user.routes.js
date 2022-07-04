const express = require('express');
const router = express.Router();
const db = require('../services/database.js');
const UserModel = require('../models/user.models.js');
const {createUser, updateUser, deleteUser}= require('../controller/user.controller');


router.route('/')
    .post(createUser)
    .get(async(req, res, next) => {
        const table = await UserModel.findAll()
        res.send(table);
    })

router.route('/:id')
    .delete(deleteUser)
    .get(async(req, res, next) => {
        const {id : Userid} = req.params;
        const UserFind = await UserModel.findAll({
            where: 
            {
                id: Userid
            }
        })
        
        res.send(UserFind);
    })
    .patch(updateUser)

module.exports = router;
