const express = require('express')
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express()
const { userrouter} = require('./api/users')
const { roomrouter} = require('./api/rooms')
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())
app.use('/api', require('./api/index.js'));
app.use('/users', userrouter);
app.use('/contact', require('./api/contact'))
app.use('/rooms', roomrouter)
const server = require('http').Server(app); 

server.listen(port,() => {
    console.log(`Server running on port ${port}`)
})
