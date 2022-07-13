require('dotenv').config();
const jwt  = require('jsonwebtoken');

const Model = require('../models/index.models.js');
const UserModel = Model.User;

const bcrypt = require('bcrypt');

function authenticateToken(req, res, next)
{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) res.send.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

const AuthUser = async(req, res, next) =>
{
    const findUser = await UserModel.findOne({
        where: {
            username: req.body.username
        }
    })
    if(findUser == null)
    {
        return res.status(400).send("cannot find user")
    }
    try{
        if(await bcrypt.compare(req.body.password, findUser.password)){
            const username = req.body.username;
            const user = {name: username}
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.json({accessToken: accessToken})
        }
        else{
            res.send('not allowed')
        }
    }
    catch{
        res.status(500).send('error');
    }
}

module.exports = {AuthUser, authenticateToken};