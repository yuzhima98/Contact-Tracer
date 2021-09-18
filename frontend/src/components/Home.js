import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import buruss from "../images/burruss-hall.jpg";
import hall from "../images/GetImage.jpeg";
import { Link } from "react-router-dom";
import { setStoredCredentials2} from "../credentials";
import { useHistory } from "react-router";
import { makeAPICall } from "../makeApiCall";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import apiprefix from '../apiprefix'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

let Home = ({currentUser, updateUser }) => {
  const history = useHistory()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    secondLogin(values);
  };

  const handleChange = (event) => {
    let { name, value } = event.target; // name/value from input element that changed
    setValues({ ...values, [name]: value }); // update corresponding field in values object
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const secondLogin = async () => {
    let res = await makeAPICall(
      "POST",
      apiprefix + `/api/users/secondLogin`,
      values
    );
    let body = await res.json();
    if (res.status === 200) {
      setStoredCredentials2(body.token);
      const user = {
        _id: body._id,
        username: body.username,
        authenticated: true,
      };
      updateUser(user);
      history.push("/home/faculty");
    }
  };

  return (
    <Box pt={10}>
      <Grid container spacing={10} justify="center" alignItems="center">
        <Grid item xs={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={buruss}
                title="Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Admin
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Admin Portal
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={handleClickOpen}
                size="small"
                color="primary"
              >
                Enter
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Admin Access</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter the admin password for admin access
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="password"
                    label="Admin Password"
                    type="password"
                    fullWidth
                    value={values.password}
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
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardActionArea>
              <CardMedia className={classes.media} image={hall} title="Image" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Student
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Student Check-In/Check-Out Portal
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                component={Link}
                to={`/home/student`}
                size="small"
                color="primary"
              >
                Enter
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Home;
