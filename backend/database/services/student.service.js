const db = require('../_helpers/database');
const Student = db.Student;
const request = require('request-promise');

module.exports = {
    getAllStudents,
    deleteStudent,
    getStudentsByRoom,
    checkIn,
    checkOut
}


async function getAllStudents() {
    return await Student.find();
}

async function getStudentsByRoom(roomName) {
    return await Student.find({room:roomName});
}

async function deleteStudent(id) {
    return await Student.deleteOne({_id: id});
}


async function checkIn(hokiePID, roomName) {
    if(hokiePID.length !== 9){
        throw 'Please enter a nine-digit number!';
    }
    const options = {
        url: 'https://api.cs.vt.edu/hokieids/',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token 97fb978728799358a63df611b6a092799daa18e9'
        }
    };
    options.url = options.url + hokiePID;
    let result = await request(options)
        .then(async function (response) {
            let json = JSON.parse(response);
            if(await Student.findOne({firstName:json.first_name, lastName:json.last_name,timeOut:null})){
                throw "You have not checked out yet!";
            }
            const studentObject = {
                firstName: json.first_name,
                lastName: json.last_name,
                room: roomName,
                timeIn: new Date(),
                timeOut: null
            };
            const student = new Student(studentObject);
            return await student.save();
            //console.log(json.first_name+' '+json.last_name);
        })
        .catch(function (err) {
            if(err.statusCode === 404){
                throw "Hokie PID Not Found. Please enter a correct one!";
            } else {
                throw err;
            }
        });
    return result;
}

async function checkOut(hokiePID) {
    if(hokiePID.length !== 9){
        throw 'Please enter a nine-digit number!';
    }
    const options = {
        url: 'https://api.cs.vt.edu/hokieids/',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Token 97fb978728799358a63df611b6a092799daa18e9'
        }
    };
    options.url = options.url + hokiePID;
    let result = await request(options)
        .then(async function (response) {
            let json = JSON.parse(response);
            if(await Student.findOne({firstName:json.first_name, lastName:json.last_name,timeOut:null})){
                if(await Student.updateOne({firstName:json.first_name, lastName:json.last_name,timeOut:null}, {$set:{timeOut:new Date()}}) ){
                    return 'Successfully check out!';
                }
            } else{
                throw 'You have not checked in yet!';
            }
            //console.log(json.first_name+' '+json.last_name);
        })
        .catch(function (err) {
            if(err.statusCode === 404){
                throw "Hokie PID Not Found. Please enter a correct one!";
            } else {
                throw err;
            }
        });
    return result;
}

