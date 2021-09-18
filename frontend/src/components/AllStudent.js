import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import { makeAPICall2 } from "../makeApiCall";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { dialog, Confirm } from "./dialog";
import Typography from "@material-ui/core/Typography";
import apiprefix from '../apiprefix'

const useStyles = makeStyles((theme) => ({
  card: {
    width: "300px",
    height: "222px",
  },
  card1: {
    marginBottom: "30px",
    height: "150px",
  },
  heading: {
    height: "120px",
    margin: "-16px",
  },
  block: {
    height: "20px",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  center1: {
    marginTop: "15px",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  center: {
    justifyContent: "center",
  },
  rightand: {
    marginLeft: "240px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
}));

let AllStudent = ({ roomlist, category, match }) => {
  let [onOff, setOnOff] = useState(false);
  let [current, setCurrent] = useState(false);
  const columns = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "room",
      headerName: "Room Number",
      width: 160,
    },
    {
      field: "timeIn",
      headerName: "Time In",
      width: 450,
      type: Date,
    },
    {
      field: "timeOut",
      headerName: "Time Out",
      width: 450,
      type: Date,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 1 }}
            onClick={async () => {
              let shouldSwitch = await dialog(
                <Confirm title="Are you sure?">
                  <Typography variant="body2">
                    Do you really want to delete this record?
                  </Typography>
                </Confirm>
              );
              if (shouldSwitch) {
                setOnOff(!onOff);
                deleteRecord(params.rowModel.data._id);
              }
            }}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];
  const columns1 = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "room",
      headerName: "Room Number",
      width: 160,
    },
    {
      field: "timeIn",
      headerName: "Time In",
      width: 900,
      type: Date,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 1 }}
            onClick={async () => {
              let shouldSwitch = await dialog(
                <Confirm title="Are you sure?">
                  <Typography variant="body2">
                    Do you really want to delete this record?
                  </Typography>
                </Confirm>
              );
              if (shouldSwitch) {
                setOnOff(!onOff);
                deleteRecord(params.rowModel.data._id);
              }
            }}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];
  const classes = useStyles();
  const [room, setRoom] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const [timeInFrom, setTimeInFrom] = React.useState(fiveYearAgo());
  const [timeInTo, setTimeInTo] = React.useState(new Date());

  const [timeOutFrom, setTimeOutFrom] = React.useState(fiveYearAgo());

  const [timeOutTo, setTimeOutTo] = React.useState(new Date());

  const deleteRecord = async (id) => {
    let res = await makeAPICall2(
      "DELETE",
      apiprefix + `/api/contact/delete`,
      { _id: id }
    );
    let body = await res.json();
    if (res.status === 200) {
      console.log("record deleted");
    }
    loadRoomInfo();
  };

  const resetAll = () => {
    setFirstName("");
    setLastName("");
    setRoomNumber("");
    setTimeInFrom(fiveYearAgo());
    setTimeOutFrom(fiveYearAgo());
    setTimeInTo(new Date());
    setTimeOutTo(new Date());
  };
  const handleTimeInFromChange = (date) => {
    setTimeInFrom(new Date(date.target.value));
    console.log(timeInFrom);
  };
  const handleTimeInToChange = (date) => {
    setTimeInTo(new Date(date.target.value));
  };
  const handleTimeOutFromChange = (date) => {
    setTimeOutFrom(new Date(date.target.value));
  };
  const handleTimeOutToChange = (date) => {
    setTimeOutTo(new Date(date.target.value));
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleRoomNumberhange = (e) => {
    setRoomNumber(e.target.value);
  };
  const loadRoomInfo = async () => {
    let res = await makeAPICall2(
      "GET",
      apiprefix + `/api/rooms/allStudents`
    );
    let body = await res.json();
    var i;
    for (i = 0; i < body.length; i++) {
      body[i].timeIn = new Date(body[i].timeIn);
      body[i].timeOut = new Date(body[i].timeOut);
    }
    setRoom(body);
    setCurrent(false)
    if (res.status === 200) {
      console.log("room loaded");
    }
  };

  const loadCurrentStudents = async () => {
    let res = await makeAPICall2(
      "GET",
      apiprefix + `/api/rooms/allStudents`
    );
    let body = await res.json();
    var ans = [];
    var i;
    for (i = 0; i < body.length; i++) {
      if (body[i].timeOut == null) {
        body[i].timeIn = new Date(body[i].timeIn);
        body[i].timeOut = new Date(body[i].timeOut);
        ans.push(body[i]);
      }
    }
    setRoom(ans);
    setCurrent(true);
    if (res.status === 200) {
      console.log("Current students ");
    }
  };

  function formatDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() < 9 ? "0" : "") + (today.getMonth() + 1);
    let day = (today.getDate() < 10 ? "0" : "") + today.getDate();
    let hours = (today.getHours() < 10 ? "0" : "") + today.getHours();
    let min = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
    let x = year + "-" + month + "-" + day + "T" + hours + ":" + min;
    return x;
  }
  function fiveYearAgo() {
    let today = new Date();
    today.setFullYear(today.getFullYear() - 5);
    return today;
  }

  function formatDatefiveyearAgo() {
    let today = new Date();
    today.setFullYear(today.getFullYear() - 5);
    let year = today.getFullYear();
    let month = (today.getMonth() < 9 ? "0" : "") + (today.getMonth() + 1);
    let day = (today.getDate() < 10 ? "0" : "") + today.getDate();
    let hours = (today.getHours() < 10 ? "0" : "") + today.getHours();
    let min = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
    let x = year + "-" + month + "-" + day + "T" + hours + ":" + min;
    return x;
  }

  function dateToString(date) {
    let today = date;
    let year = today.getFullYear();
    let month = (today.getMonth() < 9 ? "0" : "") + (today.getMonth() + 1);
    let day = (today.getDate() < 10 ? "0" : "") + today.getDate();
    let hours = (today.getHours() < 10 ? "0" : "") + today.getHours();
    let min = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
    let x = year + "-" + month + "-" + day + "T" + hours + ":" + min;
    return x;
  }

  useEffect(() => {
    loadRoomInfo();
  }, []);

  return (
    <Box pt={5}>
      <Card className={classes.card1}>
        <Grid container>
          <Grid item xs={4}>
            <div className={classes.center1}>
              <SearchIcon className={classes.searchIcon} />
              <InputBase
                placeholder="Filter By First Name"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={handleFirstNameChange}
                value={firstName}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.center1}>
              <SearchIcon className={classes.searchIcon} />
              <InputBase
                placeholder="Filter By Last Name"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={lastName}
                onChange={handleLastNameChange}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.center1}>
              <SearchIcon className={classes.searchIcon} />
              <InputBase
                placeholder="Filter By Room"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={roomNumber}
                onChange={handleRoomNumberhange}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                label="Time In: From"
                type="datetime-local"
                defaultValue={formatDatefiveyearAgo()}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={dateToString(timeInFrom)}
                onChange={handleTimeInFromChange}
              />
            </form>
          </Grid>
          <Grid item xs={3}>
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                label="Time In : To"
                type="datetime-local"
                defaultValue={formatDate()}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={dateToString(timeInTo)}
                onChange={handleTimeInToChange}
              />
            </form>
          </Grid>
          <Grid item xs={3}>
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                label="Time Out: From"
                type="datetime-local"
                defaultValue={formatDatefiveyearAgo()}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={dateToString(timeOutFrom)}
                onChange={handleTimeOutFromChange}
              />
            </form>
          </Grid>
          <Grid item xs={3}>
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                label="Time Out: To"
                type="datetime-local"
                defaultValue={formatDate()}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={dateToString(timeOutTo)}
                onChange={handleTimeOutToChange}
              />
            </form>
          </Grid>
          <Grid item xs={5}>
            <Button
              style={{ fontSize: "14px", fontWeight: "bold" }}
              color="primary"
              className={classes.center1}
              onClick={resetAll}
            >
              RESET
            </Button>
          </Grid>
          <Grid item xs={5}>
            {!current && (
              <Button
                style={{ fontSize: "14px", fontWeight: "bold" }}
                color="primary"
                className={classes.center1}
                onClick={loadCurrentStudents}
              >
                Show Current Students
              </Button>
            )}
            {current && (
              <Button
                style={{ fontSize: "14px", fontWeight: "bold" }}
                color="primary"
                className={classes.center1}
                onClick={loadRoomInfo}
              >
                Show Records
              </Button>
            )}
          </Grid>
        </Grid>
      </Card>
      <div style={{ height: 700, width: "100%" }}>
        {!current && (
          <DataGrid
            rows={room.filter(
              (arecord) =>
                arecord.firstName.includes(firstName) &&
                arecord.lastName.includes(lastName) &&
                arecord.room.includes(roomNumber) &&
                timeInFrom.getTime() <= arecord.timeIn.getTime() &&
                arecord.timeIn.getTime() <= timeInTo.getTime() &&
                timeOutFrom.getTime() <= arecord.timeOut.getTime() &&
                arecord.timeOut.getTime() <= timeOutTo.getTime()
            )}
            columns={columns}
            pageSize={10}
          />
        )}
        {current && (
          <DataGrid
            rows={room.filter(
              (arecord) =>
                arecord.firstName.includes(firstName) &&
                arecord.lastName.includes(lastName) &&
                arecord.room.includes(roomNumber) &&
                timeInFrom.getTime() <= arecord.timeIn.getTime() &&
                arecord.timeIn.getTime() <= timeInTo.getTime()
            )}
            columns={columns1}
            pageSize={10}
          />
        )}
      </div>
    </Box>
  );
};

export default AllStudent;
