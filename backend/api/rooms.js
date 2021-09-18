const express = require("express");
const roomrouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const jwtsecret = config.get("jwtsecret");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const room = require("../database/services/room.service");
const student = require("../database/services/student.service");
const {authenticate, secondAuth} = require('./auth')

roomrouter.delete("/deleteStudent:id", urlencodedParser, secondAuth, async (req, res) => {
  student
      .deleteStudent(req.params.id)
      .then((astudent) => res.json(astudent))
      .catch((err) => res.status(400).json({ message: err }));
});

roomrouter.delete("/delete", urlencodedParser, secondAuth, async (req, res) => {
  room
      .deleteRoom(req.body._id)
      .then((result) => res.json(result))
      .catch((err) => res.status(400).json({ message: err }));
});

roomrouter.post("/create", urlencodedParser, secondAuth, async (req, res) => {
  room
    .addRoom(req.body.roomNumber)
    .then(() => res.json({}))
    .catch((err) => res.status(400).json({ message: err }));
});

roomrouter.get("/all", urlencodedParser, authenticate, async (req, res) => {
  room
    .getAllRooms()
    .then((rooms) => res.json(rooms))
    .catch((err) => res.status(400).json({ message: err }));
});

roomrouter.get("/allStudents", urlencodedParser, secondAuth, async (req, res) => {
  student
    .getAllStudents()
    .then((astudent) => res.json(astudent))
    .catch((err) => res.status(400).json({ message: err }));
});

roomrouter.post("/checkIn", urlencodedParser, authenticate, async (req, res) => {
  student
      .checkIn(req.body.hokiePID, req.body.roomName)
      .then((astudent) => res.json(astudent))
      .catch((err) => res.status(400).json({ message: err }));
});

roomrouter.post("/checkOut", urlencodedParser, authenticate, async (req, res) => {
  student
      .checkOut(req.body.hokiePID)
      .then((astudent) => res.json(astudent))
      .catch((err) => res.status(400).json({ message: err }));
});

roomrouter.get("/:id", urlencodedParser, secondAuth, async (req, res) => {
  student
    .getStudentsByRoom(req.params.id)
    .then((astudent) => res.json(astudent))
    .catch((err) => res.status(400).json({ message: err }));
});

module.exports = {
  roomrouter,
};
