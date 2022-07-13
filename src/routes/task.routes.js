const express = require('express');
const router = express.Router();
const db = require('../services/database.js');
const Model = require('../models/index.models.js');
const {createTask, updateTask, deleteTask, 
    getAllTask, getTaskbyID, getTaskbyTitle,
    getTaskbyUsername}= require('../controller/task.controller');

const TaskModel = Model.Task;

router.route('/')
    .post(createTask)
    .get(getAllTask)

router.route('/title/:title')
    .get(getTaskbyTitle)

router.route('/id/:id')
    .delete(deleteTask)
    .get(getTaskbyID)
    .patch(updateTask)

router.route('/username/:username')
    .get(getTaskbyUsername)

    
module.exports = router;
