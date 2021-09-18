import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeAPICall } from "../makeApiCall";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router-dom";
import apiprefix from '../apiprefix'

const useStyles = makeStyles((theme) => ({
  card: {
    width: "200px",
    height: "50px",
  },
  card1: {
    width: "500px",
    marginBottom: "30px",
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
}));

let Checkin = ({ roomlist, category, filter, match }) => {
  const classes = useStyles();
  const {id} = useParams()
  const [open, setOpen] = React.useState(false);
  const [hokieID, setHokieID] = useState("");
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  
  const handleChange = (event) => {
    let { value } = event.target;
    setHokieID(value);
  };
  const checkIn = async () => {
    let res = await makeAPICall("POST", apiprefix + `/api/rooms/checkIn`, {
      hokiePID: hokieID,
      roomName: id,
    });
    let body = await res.json();
    if (res.status == 200) {
      setHokieID("");
      setSeverity("success")
      setMessage("You have successfuly checked in!");
      handleClick();
    } else if (res.status == 400) {
      setHokieID("");
      setSeverity("error")
      setMessage(body.message);
      handleClick();
    }
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const checkOut = async () => {
    let res = await makeAPICall(
      "POST",
      apiprefix + `/api/rooms/checkOut`,
      { hokiePID: hokieID }
    );
    let body = await res.json();
    if (res.status == 200) {
      setHokieID("");
      setSeverity("success")
      setMessage("You have successfuly checked out!");
      handleClick();
    } else if (res.status == 400) {
      setHokieID("");
      setSeverity("error")
      setMessage(body.message);
      handleClick();
    }
  };

  const handleCheckIn = (event) => {
    event.preventDefault();
    checkIn();
  };
  const handleCheckOut = (event) => {
    event.preventDefault();
    checkOut();
  };
  return (
    <Box pt={10}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
      <Grid container justify="center" alignItems="center">
        <TextField
          className={classes.card1}
          autoFocus
          margin="normal"
          name="hokiepid"
          label="Hokie ID"
          type="text"
          fullWidth
          value={hokieID}
          onChange={(event) => handleChange(event)}
        />
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={2}>
          <Button className={classes.card} onClick={handleCheckIn}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="button" component="h2">
                    Check In
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button className={classes.card} onClick={handleCheckOut}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="button" component="h2">
                    Check Out
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkin;
