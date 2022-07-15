const Model = require('../models/index.models.js');
const bodyparser = require('body-parser');
const express = require('express');

const TaskModel = Model.Task;
const UserModel = Model.User;

//create task
const createTask = async(req, res, next) => {
    try{
    const NEWTASK = req.body;
    await TaskModel.create(NEWTASK);
    res.send('created!');
    }
    catch{
        res.status(500).send()
    }

}


// return all task
const getAllTask = async(req, res, next) => {
    const TABLE = await TaskModel.findAll({
        order: [
            ['id', 'ASC']
        ],
    })
    res.send(TABLE)
}

//return tasks by ID
const getTaskbyID = async(req, res, next) => {
    try{
    const {id: ID} = req.params;
    const TASKFIND = await TaskModel.findAll({
        where: 
        {
            id: ID
        }
    })
    if(TASKFIND == null )
        return res.send('cannot find task')
    res.send(TASKFIND);
}
catch{
    res.status(500).send();
}
}

//get task by title
const getTaskbyTitle = async(req, res, next) => {

    const {title: TITLE } = req.params;
    const TASKFIND = await TaskModel.findAll({
        where:
        {
            title: TITLE
        }
    })
    if(TASKFIND.length == 0 || !isNaN(TITLE))
        return res.send('cannot find task');
    res.send(TASKFIND);
}

//get tasks by username
const getTaskbyUsername = async(req, res, next) => {
    try{
    const {username: USERNAME} = req.params;
    const ALLTASKFIND = await TaskModel.findAll({include: 
    [{
        model: UserModel,
        //required: true,
        where: {
            'username': USERNAME
        },
        attributes: [],
    },
],
})

    if(ALLTASKFIND.length != 0) 
        {return res.send(ALLTASKFIND)}
    else
    {
        res.sendStatus(404);
    }
}
    catch{
        res.status(500).send();
    }
        
}

//update task
const updateTask = async(req, res, next) => {
    const {id: ID} = req.params;
    const {title: TITLE, description: DESCRIPTION, User_id: USER_ID, status: STATUS} = req.body;
    
    const UPDATETASK = await TaskModel.findOne({
        where: {
            id: ID
        },
    })

    if(TITLE) {UPDATETASK.title = TITLE};
    if(DESCRIPTION) {UPDATETASK.description = DESCRIPTION};
    if(USER_ID){UPDATETASK.User_id = USER_ID};
    if(STATUS) {UPDATETASK.status = STATUS}
    console.log(UPDATETASK)
    await UPDATETASK.save();
    res.send('updated');

    
}

//filter task regardless of username
const filterAllTaskStatus = async(req, res, next) => {
    const STATUS = req.query.status;
    const TASKFIND = await TaskModel.findAll({
        where: {
            status: STATUS
        }
    })
    res.send(TASKFIND)
}

//filter tasks depend on username
const filterTaskStatus = async(req,res, next) => {
    try{
    const STATUS = req.query.status;
    const {username: USERNAME} = req.params;
    const USERTASKSFIND = await TaskModel.findAll({include: 
        [{
            model: UserModel,
            //required: true,
            where: {
                'username': USERNAME,
            },
            attributes: [],
        },
    ],
    })
    const TASKFINDFINAL = await USERTASKSFIND.filter(task => task.status == STATUS)
    res.send(TASKFINDFINAL)
}
catch{
    res.status(500).send()
}
}

//delete task
const deleteTask = async(req, res, next) => {
    const {id: ID} = req.params;
    const TASKFIND =await TaskModel.findOne({
        where: {
            id: ID
        }
    })
    if(TASKFIND == null)
        res.send(`cannot find task with ID = ${ID}`)
    
    await TaskModel.destroy({
        where: {
            id: ID
        }
    })
    res.send('deleted!')

}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getAllTask,
    getTaskbyID,
    getTaskbyTitle,
    getTaskbyUsername,
    filterAllTaskStatus,
    filterTaskStatus
}
