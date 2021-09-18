import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeAPICall, makeAPICall2 } from "../makeApiCall";
import Room from "./Rooms";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import apiprefix from '../apiprefix'

const useStyles = makeStyles((theme) => ({
  card: {
    width: "300px",
    height: "222px",
  },
  card1: {
    marginTop: "-10px",
    margin: "auto",
    width: "30%",
    marginBottom: "30px",
  },
  heading: {
    height: "120px",
    backgroundColor: "#74992e",
    margin: "-16px",
  },
  block: {
    height: "20px",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: "relative",
    minHeight: 200,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  center: {
    justifyContent: "center",
  },
  center1: {
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
}));

let Faculty = () => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);

  const [values, setValues] = useState({
    roomNumber: "",
  });
  const [roomlist, setRoomList] = useState([]);
  const [filter, setFilter] = useState("");
  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    loadRoom();
  }, []);

  const handleChange = (event) => {
    let { name, value } = event.target; // name/value from input element that changed
    setValues({ ...values, [name]: value }); // update corresponding field in values object
  };
  const createRoom = async () => {
    let res = await makeAPICall2(
      "POST",
      apiprefix + `/api/rooms/create`,
      values
    );
    let body = await res.json();
    if (res.status === 200) {
      setMessage("Room Created");
      handleClickSnack(true);
    }
  };

  /**
   * Take all the rooms from database
   */
  const loadRoom = async () => {
    let res = await makeAPICall("GET", apiprefix + "/api/rooms/all");
    let body = await res.json();
    setRoomList(body);
    if (res.status === 200) {
      console.log("room loaded");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createRoom(values);
    await loadRoom();
    setOpen(false);
  };
  return (
    <Box pt={5}>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <MuiAlert onClose={handleClose} severity="success">
          {message}
        </MuiAlert>
      </Snackbar>
      <Card className={classes.card1}>
        <div className={classes.center1}>
          <SearchIcon className={classes.searchIcon} />
          <InputBase
            placeholder="Search Room"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={handleSearchChange}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Card>
      <Typography align="center" color="primary" style={{ flexGrow: 1 }}>
        <Button
          component={Link}
          to={`./faculty/records/all`}
          style={{ fontSize: "14px", fontWeight: "bold" }}
          color="inherit"
        >
          Show All Records
        </Button>
      </Typography>
      <Room
        filter={filter}
        loadRoom={loadRoom}
        roomlist={roomlist}
        category="faculty"
      ></Room>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the Room Number/Room Name</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="roomNumber"
            label="Room Number"
            type="text"
            fullWidth
            value={values.roomNumber}
            onChange={(event) => handleChange(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Faculty;
