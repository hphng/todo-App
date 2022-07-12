const express = require('express');
const router = express.Router();
const db = require('../services/database.js');
const Model = require('../models/index.models.js');
const {createTask, updateTask, deleteTask}= require('../controller/task.controller');

const TaskModel = Model.Task;

router.route('/')
    .post(createTask)
    .get(async(req, res, next) => {
        const table = await TaskModel.findAll()
        res.send(table);
    })

router.route('/:id')
    .delete(deleteTask)
    .get(async(req, res, next) => {
        const {id} = req.params;
        const TaskFind = await TaskModel.findAll({
            where: 
            {
                id: id
            }
        })
        res.send(TaskFind);
    })
    .patch(updateTask)

module.exports = router;
