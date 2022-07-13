const Model = require('../models/index.models.js');
const bcrypt = require('bcrypt');


const UserModel = Model.User;
const TaskModel = Model.Task;

const createUser = async(req, res, next) => {
    const newUser = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        newUser.password = hashPassword;

    }
    catch {
        res.status(500).send();
    }
    await UserModel.create(newUser);
    
    res.send('created!');

}

const getAllUser = async(req, res, next) => {
    const table = await(UserModel.findAll());
    res.send(table);
}

const getUserbyID = async(req,res, next) => {
    const {id : Userid} = req.params;
        const UserFind = await UserModel.findAll({
            where: 
            {
                id: Userid
            }
        })
        
        res.send(UserFind);
}

// const getUsersandTasks = async(req, res, next )=> {
//     const All = await UserModel.findAll({
//         include: [{
//             model: TaskModel,
//             required: true
//         },
//     ],
//     })
//     res.send(All);
// }


const updateUser = async(req, res, next) => {
    const {id} = req.params;
    console.log(id);
    const {username, description,password} = req.body;
    
    const updateUser = await UserModel.findOne({
        where: {
            id: id
        }
    })

    if(username) {updateUser.username = username};
    if(description) {updateUser.description = description};
    if(password) {updateUser.password = password};
    await updateUser.save();

    res.send('updated');
}

const deleteUser = async(req, res, next) => {
    const {id} = req.params;
    await UserModel.destroy({
        where: {
            id: id
        }
    });
    res.send('deleted!')
}

const displayAuthUser = async(req,res, next) => {
    const nameFind = req.user.name;
    const UserFind = await UserModel.findOne({
        where:
        {
            username: nameFind
        }
    })
    console.log(UserFind);
    //const result = posts.filter(post => post.username ===  req.user.name)
    res.send(UserFind);
}



module.exports = {
    createUser,
    updateUser,
    deleteUser,
    displayAuthUser,
    getAllUser,
    getUserbyID
}