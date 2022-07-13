const Model = require('../models/index.models.js');
const bodyparser = require('body-parser');
const express = require('express');

const TaskModel = Model.Task;
const UserModel = Model.User;


const createTask = async(req, res, next) => {
    const newTask = req.body;
    await TaskModel.create(newTask);
    res.send('created!');

}

const getAllTask = async(req, res, next) => {
    const table = await (TaskModel.findAll())
    res.send(table)
}

const getTaskbyID = async(req, res, next) => {
    const {id} = req.params;
    const TaskFind = await TaskModel.findAll({
        where: 
        {
            id: id
        }
    })
    console.log(TaskFind)
    if(TaskFind == null )
        return res.send('cannot find task')
    res.send(TaskFind);
}

const getTaskbyTitle = async(req, res, next) => {
    const {title } = req.params;
    const TaskFind = await TaskModel.findAll({
        where:
        {
            title: title
        }
    })
    console.log(title)
    if(TaskFind == null || !isNaN(title))
        return res.send('cannot find task');
    res.send(TaskFind);
}

const getTaskbyUsername = async(req, res, next) => {
    const {username} = req.params;
    console.log(username)
    const UserFind = await UserModel.findOne({
        where:
        {
            username: username
        }
    })


//     const abc = await TaskModel.findAll({include: 
//     [{
//         model: UserModel,
//         required: true,
//         where: {
//             'username': username
//         }
//     },
// ],
// })
// console.log(JSON.stringify(abc, null, 2))


    if(UserFind == null) 
        return res.send('cannot find user');
    const id  = UserFind.id;
    console.log(UserFind.username)
    const TaskFind = await TaskModel.findAll({
        where:
        {
            User_id: id
        }
    })
    if(TaskFind == null) return res.send('user does not have tasks!')
    res.send(TaskFind)
}

const updateTask = async(req, res, next) => {
    const {id} = req.params;
    const {title, description, User_id, status} = req.body;
    
    const updateTask = await TaskModel.findAll({
        where: {
            id: id
        }
    })

    if(title) {updateTask.title = title};
    if(description) {updateTask.description = description};
    if(User_id){updateTask.User_id = User_id};
    if(status) {updateTask.status = status}

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
    deleteTask,
    getAllTask,
    getTaskbyID,
    getTaskbyTitle,
    getTaskbyUsername
}