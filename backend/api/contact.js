const express = require('express');
const contactrouter = express.Router();
const {authenticate, secondAuth} = require('./auth')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const student = require("../database/services/student.service");

contactrouter.get('/', urlencodedParser, authenticate, async (req, res) => {
    res.json({ randomContactInfo })
});

contactrouter.delete("/delete", urlencodedParser, secondAuth, async (req, res) => {
    student
        .deleteStudent(req.body._id)
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json({ message: err }));
  });

module.exports = contactrouter; 
