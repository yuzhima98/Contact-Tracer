const jwt = require('jsonwebtoken')
const config = require('config')
const jwtsecret = config.get('jwtsecret')
const db = require('../database/_helpers/database');
const Admin = db.Admin;

async function authenticate(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){
        return res.sendStatus(401)
    }
    const decoded = jwt.verify(token, jwtsecret)
    const user = await Admin.findOne({_id: decoded.sub})
    if (user) {
        req.user = user
        next()
    }else {
        return res.sendStatus(401)
    }
}

async function secondAuth(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null){
        return res.sendStatus(401)
    }
    const decoded = jwt.verify(token, jwtsecret)
    const user = await Admin.findOne({_id: decoded.sub})
    if (user.username == 'thesecretuser') {
        req.user = user
        next()
    }else {
        return res.sendStatus(401)
    }
}


module.exports = {
    authenticate,
    secondAuth
}