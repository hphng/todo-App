require('dotenv').config();
const jwt  = require('jsonwebtoken');

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
    
    const username = req.body.username;
    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
}

module.exports = {AuthUser, authenticateToken};