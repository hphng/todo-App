const Sequelize = require('sequelize');
const db = require('../services/database.js');

const User = db.define('users', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
}, {
    freezeTableName: true,
    tableName: 'users'
});
db.sync()
module.exports = User;