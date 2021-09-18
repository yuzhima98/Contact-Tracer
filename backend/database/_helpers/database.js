const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/contactTracing", {useCreateIndex: true, useNewUrlParser: true});

module.exports = {
    Student: require('../models/student.model'),
    Admin: require('../models/admin.model'),
    Room: require('../models/room.model'),
}
