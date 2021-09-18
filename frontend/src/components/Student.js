import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";

import { makeAPICall } from "../makeApiCall";
import Room from "./Rooms";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import apiprefix from '../apiprefix'
const useStyles = makeStyles((theme) => ({
  card: {
    width: "300px",
    height: "222px",
  },
  card1: {
    marginTop: "-10px",
    margin: "auto",
    width: '30%',
    marginBottom: "30px"
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

let Student = () => {
  const classes = useStyles();
  const [roomlist, setRoomList] = useState([]);
  const [filter, setFilter] = useState("");
  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    loadRoom();
  }, []);

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

  return (
    <Box pt={5}>
      <Card className={classes.card1} >
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
      <Room filter={filter} loadroom={loadRoom} roomlist={roomlist} category="student"></Room>
    </Box>
  );
};
export default Student;
