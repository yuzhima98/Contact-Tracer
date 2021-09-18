import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withRouter, Switch as RRSwitch, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(85),
  },
  title: {
    flexGrow: 1,
  },
}));

let ButtonAppBar = ({ location, currentUser, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Research Labs Contact Tracing
          </Typography>
          <Typography align="left" variant="h6" className={classes.menuButton}>
          {(currentUser.authenticated && !location.pathname.includes("/home/student/")) && (
              <Tabs style={{ align: "left" }}>
                <Tab component={Link} to={"/home"} label="Home" />
              </Tabs>
            )}
          </Typography>
          <Typography align="right" color="inherit" style={{ flexGrow: 1 }}>
            {(currentUser.authenticated && !location.pathname.includes("/home/student/")) && (
              <Button
                component={Link}
                to={`/logout`}
                style={{ fontSize: "14px", fontWeight: "bold" }}
                color="inherit"
              >
                LOGOUT
              </Button>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
      <RRSwitch>{children}</RRSwitch>
    </div>
  );
};
ButtonAppBar = withRouter(ButtonAppBar);
export default ButtonAppBar;
