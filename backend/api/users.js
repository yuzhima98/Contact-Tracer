const express = require('express');
const userrouter = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const config = require('config')
const jwtsecret = config.get('jwtsecret')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const admin = require('../database/services/admin.service');
const test = require('../database/_helpers/getSimpleData')
const {authenticate} = require('./auth')

userrouter.post('/login', urlencodedParser, async (req, res) => {
    // const { username, password } = req.body;
    // const user = users.find(user => user.username == username)
    // if (await bcrypt.compare(password, user.password)){
    //     const userInfo = { username: user.username}
    //     const token = jwt.sign(userInfo, jwtsecret)
    //     res.json({token: token, message:'sucessfully logged in'})
    // } else {
    //     return res.status(401).json({ message: 'wrong username or password' })
    // }
    admin.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}));
});

userrouter.post('/secondLogin', urlencodedParser, authenticate, async (req, res) => {
    admin.secondAuthenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}));
});

userrouter.post('/register', urlencodedParser, async (req, res) => {
    admin.addAdmin(req.body)
        .then(() => res.json({}))
        .catch(err => res.status(400).json({ message: err }));
});

userrouter.get('/test', urlencodedParser, async (req, res) => {
    test.addStudent()
    return res.json({})
});

module.exports = {
    userrouter,
}
