const express = require('express');
const apirouter = express.Router();
const { userrouter} = require('./users')
const { roomrouter} = require('./rooms')
apirouter.get('/', function(req, res) {
  res.json({ message: 'API is accessible' });
});
apirouter.use('/users', userrouter);
apirouter.use('/contact', require('./contact'))
apirouter.use('/rooms', roomrouter)
module.exports = apirouter;