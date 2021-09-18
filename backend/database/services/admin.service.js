const config = require('config')
const password_secret = config.get('jwtsecret')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const Admin = db.Admin;



module.exports = {
    authenticate,
    getAllAdmins,
    getAdminById,
    addAdmin,
    secondAuthenticate,
}

async function authenticate({ username, password }) {

    const admin = await Admin.findOne({username:username});
    if (admin && bcrypt.compareSync(password, admin.hash) ) {
        const { hash, ...adminWithoutHash } = admin.toObject();

        const token = jwt.sign({ sub: admin.id}, password_secret);
        return {
            ...adminWithoutHash,        //send admin.username and token back
            token
        };
    }
}

async function secondAuthenticate({ password }) {

    const admin = await Admin.findOne({username:"thesecretuser"});
    if (admin && bcrypt.compareSync(password, admin.hash) ) {
        const { hash, ...adminWithoutHash } = admin.toObject();

        const token = jwt.sign({ sub: admin.id}, password_secret);
        return {
            ...adminWithoutHash,        //send admin.username and token back
            token
        };
    }
}

async function getAllAdmins() {
    //return all admins'info without including hash
    return await Admin.find().select('-hash');
}

async function getAdminById(id) {
    return await Admin.findOne({_id: id});
}

async function addAdmin(adminParam) {
    if(await Admin.findOne({username:adminParam.username})){
        throw 'Admin username "' + adminParam.username + '" is already taken';
    }
    const admin = new Admin(adminParam);
    if (adminParam.password) {
        admin.hash = bcrypt.hashSync(adminParam.password, 10);
    } else{
        throw 'No password entered';
    }
    return admin.save();

}

