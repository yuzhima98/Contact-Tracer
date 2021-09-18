const db = require("./database");
const Student = db.Student;
const Room = db.Room;
const Admin = db.Admin
// const schema = new Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     room: {type:String, required: true},
//     timeIn: {type: Date, default: Date.now },
//     timeOut: {type: Date, default: Date.now }
// });
let studentRecord = [
  {
    firstName: "Calvin",
    lastName: "Huang",
    room: "MCB123",
    timeIn: new Date(2018, 11, 24, 10, 33, 30),
    timeOut: new Date(2018, 11, 24, 12, 33, 30),
  },
  {
    firstName: "Zhengbo",
    lastName: "Wang",
    room: "MCB123",
    timeIn: new Date("2018-05-25T10:00:00Z"),
    timeOut: new Date("2018-05-25T11:00:00Z"),
  },
  {
    firstName: "Joe",
    lastName: "Me",
    room: "UTA234",
    timeIn: new Date("2018-05-25T11:00:00Z"),
    timeOut: new Date("2018-05-25T12:00:00Z"),
  },
  {
    firstName: "Aatrox",
    lastName: "Dam",
    room: "OPD345",
    timeIn: new Date("2018-05-25T13:00:00Z"),
    timeOut: new Date("2018-05-25T14:00:00Z"),
  },
  {
    firstName: "Paul",
    lastName: "Smith",
    room: "VJF345",
    timeIn: new Date("2018-05-25T15:00:00Z"),
    timeOut: new Date("2018-05-25T16:00:00Z"),
  },
  {
    firstName: "Jei",
    lastName: "X",
    room: "FJV345",
    timeIn: new Date("2018-05-25T17:00:00Z"),
    timeOut: new Date("2018-05-25T18:00:00Z"),
  },
];
let studentRecord1 = [
  {
    username: "admin",
    password: "theadminpassword",
  },
  {
    username: "thesecretuser",
    password: "adminadmin",
  },
];
async function addStudent() {
  for (i = 0; i < studentRecord.length; i++) {
    const student = new Student(studentRecord[i]);
    await student.save();
  }
  for (i = 0; i < studentRecord1.length; i++) {
    const admin = new Admin(studentRecord1[i]);
    await admin.save();
  }
  return;
}

module.exports = {
  addStudent,
};
