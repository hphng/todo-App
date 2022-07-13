const Model = require('../models/index.models.js');

const UserModel = Model.User;
const TaskModel = Model.Task;

const getUsersandTasks = async(req, res, next )=> {
    const All = await UserModel.findAll({
        include: [{
            model: TaskModel,
            required: true
        },
    ],
    })
    res.send(All);
}

module.exports = {getUsersandTasks}