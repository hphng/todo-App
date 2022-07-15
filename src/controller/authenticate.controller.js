require('dotenv').config();
const jwt  = require('jsonwebtoken');

const Model = require('../models/index.models.js');
const UserModel = Model.User;

const bcrypt = require('bcrypt');

function authenticateToken(req, res, next)
{
    const AUTHHEADER = req.headers['authorization'];
    const TOKEN = AUTHHEADER && AUTHHEADER.split(' ')[1];

    if(TOKEN == null) res.send.sendStatus(401);

    jwt.verify(TOKEN, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

const authUser = async(req, res, next) =>
{
    const FINDUSER = await UserModel.findOne({
        where: {
            username: req.body.username
        }
    })
    if(FINDUSER == null)
    {
        return res.status(400).send("cannot find user")
    }
    try{
        if(await bcrypt.compare(req.body.password, FINDUSER.password)){
            const USERNAME = req.body.username;
            const USER = {name: USERNAME}
            const ACCESSTOKEN = jwt.sign(USER, process.env.ACCESS_TOKEN_SECRET)
            res.json({accessToken: ACCESSTOKEN})
        }
        else{
            res.send('not allowed')
        }
    }
    catch{
        res.status(500).send('error');
    }
}

module.exports = {authUser, authenticateToken};