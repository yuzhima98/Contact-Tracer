const db = require('../_helpers/database');
const Room = db.Room;

module.exports = {
    getAllRooms,
    deleteRoom,
    addRoom
}


async function getAllRooms() {
    return await Room.find();
}

//delete a room by using their unique id.
async function deleteRoom(id) {
    return await Room.deleteOne({_id: id});
}

async function addRoom(roomName) {
    if(await Room.findOne({name:roomName})){
        throw 'Room name "' + roomName + '" is already taken';
    }
    const room = new Room({name: roomName, color: getRandomColor()});
    return await room.save();
}

function getRandomColor() {
    const randomColor = ["#1abc9c", "#2ecc71", "#3498db","#9b59b6","#34495e","#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6"];
    let index = Math.floor(Math.random() * 10);
    return randomColor[index];
};
