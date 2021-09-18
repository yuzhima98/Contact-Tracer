import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { makeAPICall2 } from "../makeApiCall";
import { dialog, Confirm } from "./dialog";
import apiprefix from '../apiprefix'

const useStyles = makeStyles((theme) => ({
  card: {
    width: "300px",
    height: "222px",
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

let Rooms = ({ roomlist, loadRoom, category, filter }) => {
  const classes = useStyles();
  let [onOff, setOnOff] = useState(false);

  const deleteRoom = async (id) => {
    let res = await makeAPICall2(
      "DELETE",
      apiprefix + `/api/rooms/delete`,
      { _id: id }
    );
    let body = await res.json();
    if (res.status === 200) {
      console.log("room deleted");
    }
    loadRoom();
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {roomlist.map(
          (room) =>
            room.name.includes(filter) && (
              <Grid item xs={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      className={classes.heading}
                      style={{ backgroundColor: room.color }}
                    ></Typography>
                    <Typography className={classes.block}></Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {room.name}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.center}>
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={category + "/" + room.name}
                    >
                      ENTER
                    </Button>
                    {category == "faculty" && (
                      <Button
                        size="small"
                        color="primary"
                        onClick={async () => {
                          let shouldSwitch = await dialog(
                            <Confirm title="Are you sure?">
                              <Typography variant="body2">
                                Do you really want to delete this room?
                              </Typography>
                            </Confirm>
                          );
                          if (shouldSwitch) {
                            setOnOff(!onOff);
                            deleteRoom(room._id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            )
        )}
      </Grid>
    </div>
  );
};

export default Rooms;
