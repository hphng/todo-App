const Model = require('../models/index.models.js');
const bodyparser = require('body-parser');
const express = require('express');

const TaskModel = Model.Task;


const createTask = async(req, res, next) => {
    const newTask = req.body;
    await TaskModel.create(newTask);
    res.send('created!');

}
const updateTask = async(req, res, next) => {
    const {id} = req.param;
    const {title, description, User_id} = req.body;
    
    const updateTask = await TaskModel.findAll({
        where: {
            id: id
        }
    })

    if(title) {updateTask.title = title};
    if(description) {updateTask.description = description};
    if(User_id){updateTask.User_id = User_id};

    await updateTask.save();
    res.send('updated');

    
}

const deleteTask = async(req, res, next) => {
    const {id} = req.params;
    await TaskModel.destroy({
        where: {
            id: id
        }
    });

}

module.exports = {
    createTask,
    updateTask,
    deleteTask
}