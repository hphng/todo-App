const UserModel = require('../models/user.models.js');
const bodyparser = require('body-parser');


const createUser = async(req, res, next) => {
    const newUser = req.body;
    console.log(req.body);
    await UserModel.create(newUser);
    res.send('created!');

}
const updateUser = async(req, res, next) => {
    const {id} = req.param;
    const {title, description} = req.body;
    
    const updateUser = await UserModel.findAll({
        where: {
            id: id
        }
    })

    if(title) {updateUser.title = title};
    if(description) {updateUser.description = description};

    await UserModel.save();
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

module.exports = {
    createUser,
    updateUser,
    deleteUser
}