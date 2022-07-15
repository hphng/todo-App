const Model = require('../models/index.models.js');
const bcrypt = require('bcrypt');


const UserModel = Model.User;
const TaskModel = Model.Task;

const createUser = async(req, res, next) => {
    const NEWUSER = req.body;
    try {
        const SALT = await bcrypt.genSalt();
        const HASHPASSWORD = await bcrypt.hash(req.body.password, SALT)
        NEWUSER.password = HASHPASSWORD;
        await UserModel.create(NEWUSER);
    
        res.send('created!');
    }
    catch {
        res.status(500).send();
    }

}

const getAllUser = async(req, res, next) => {
    const TABLE = await(UserModel.findAll());
    res.send(TABLE);
}

const getUserbyID = async(req,res, next) => {
    try{
    const {id : USERID} = req.params;
        const USERFIND = await UserModel.findAll({
            where: 
            {
                id: USERID
            }
        })
        if(USERFIND.length == 0){
            return res.send(`cannot find user with ID ${USERID}`)
        }
        return res.send(USERFIND);
    }
    catch{
        res.status(500).send();
    }
}



const updateUser = async(req, res, next) => {
    const {id: ID} = req.params;
    const {username, password, description} = req.body;
    const FINDUSER = await UserModel.findOne({
        where: {
            id: ID
        }
    })

    if(username) {FINDUSER.username = username};
    if(password) {
        const SALT = await bcrypt.genSalt();
        const HASHPASSWORD = await bcrypt.hash(JSON.stringify(password), SALT)
        FINDUSER.password = HASHPASSWORD;
    };
    if(description) {FINDUSER.description = description};
    await FINDUSER.save();

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

const getUsersandTasks = async(req, res, next )=> {
    const ALL = await UserModel.findAll({
        include: [{
            model: TaskModel,
            required: false
        },
    ],
    })
    res.send(ALL);
}
const displayAuthUser = async(req,res, next) => {
    const NAMEFIND = req.user.name;
    const USERFIND = await UserModel.findOne({
        where:
        {
            username: NAMEFIND
        }
    })
    //const result = posts.filter(post => post.username ===  req.user.name)
    res.send(USERFIND);
}



module.exports = {
    createUser,
    updateUser,
    deleteUser,
    displayAuthUser,
    getAllUser,
    getUserbyID,
    getUsersandTasks
}