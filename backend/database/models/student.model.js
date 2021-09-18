const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    room: {type:String, required: true},
    timeIn: {type: Date, default: Date.now },
    timeOut: {type: Date, default: Date.now }
});

schema.set( 'toJSON',{virtuals: true});
module.exports = mongoose.model('Student', schema);
