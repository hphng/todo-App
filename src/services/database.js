const Sequelize = require('sequelize');
const path = 'postgres://postgres:31032003@locahost:5432/car';

module.exports = new Sequelize('test', 'postgres', '31032003', {
    host: 'localhost',
    dialect: 'postgres',
    //operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});


