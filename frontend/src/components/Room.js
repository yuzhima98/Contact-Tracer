import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import { makeAPICall2 } from "../makeApiCall";
import Button from "@material-ui/core/Button";
import { dialog, Confirm } from "./dialog";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
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

let Room = ({ roomlist, category, filter, match }) => {
  let [onOff, setOnOff] = useState(false);
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
  const classes = useStyles();
  const [room, setRoom] = useState([]);
  const {id} = useParams()

  const loadRoomInfo = async () => {
    let res = await makeAPICall2(
      "GET",
      apiprefix + `/api/rooms/${id}`
    );
    let body = await res.json();
    var i;
    for (i = 0; i < body.length; i++) {
      body[i].timeIn = new Date(body[i].timeIn);
      body[i].timeOut = new Date(body[i].timeOut);
      if (
        body[i].timeOut ==
        "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)"
      ) {
        body[i].timeOut = "-";
      } else {
        body[i].timeOut = new Date(body[i].timeOut);
      }
    }
    setRoom(body);
    if (res.status === 200) {
      console.log("room loaded");
    }
  };

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
  useEffect(() => {
    loadRoomInfo();
  }, []);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid rows={room} columns={columns} pageSize={10} />
    </div>
  );
};

export default Room;
