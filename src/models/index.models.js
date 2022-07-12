const Task = require('./task.models');
const User = require('./user.models');
const db = require('../services/database.js');

User.hasMany(Task, 
    {foreignKey: "User_id"
});

Task.belongsTo(User, {
    foreignKey: "User_id"
});


module.exports = {Task, User};