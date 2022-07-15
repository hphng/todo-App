const Sequelize = require('sequelize');
const db = require('../services/database.js');
const Task = require('./task.models');

const User = db.define('users', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    description: Sequelize.TEXT
}, {
    freezeTableName: true,
    tableName: 'users'
});


db.sync()
module.exports = User;