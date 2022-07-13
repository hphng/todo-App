const Sequelize = require('sequelize');
const db = require('../services/database.js');

const Task = db.define('tasks', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    User_id: Sequelize.INTEGER,
    status: {
        type: Sequelize.ENUM,
        values: ['done','doing', 'todo']
    }
}, 
    {
    freezeTableName: true,
    tableName: 'tasks'
    })
    
db.sync();

// User.hasMany(Task, 
//     {foreignKey: 'User_id'
// });

// Task.belongsTo(User);


module.exports = Task;
