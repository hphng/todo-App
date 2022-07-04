const express = require('express');
const bodyparser = require('body-parser');
const Sequelize = require('sequelize');
const path = 'postgres://postgres:31032003@locahost:5432/test';
const router = require('./routes/index.route')
const db = require('./services/database.js');
const app = express();

const port = 3000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'no'
//     });
// });


// console.log(typeof router);
app.use('/', router);

app.listen(port, (req, res) =>{
    console.log('Server is ready')
});

db.authenticate()
    .then(()=> console.log('database connecting...'))
    .catch(err => console.log('Error' + err))

