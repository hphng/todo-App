const Sequelize = require('sequelize');
const db = require('../services/database.js');
const Task = require('./task.models');

const User = db.define('users', {
    username: Sequelize.STRING,
    description: Sequelize.TEXT,
}, {
    freezeTableName: true,
    tableName: 'users'
});

// User.hasMany(Task, 
//     {foreignKey: 'User_id'
// });

// Task.belongsTo(User);

db.sync()
module.exports = User;