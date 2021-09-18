import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeAPICall } from "../makeApiCall";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import vt from "../images/virginia-tech.jpg";
import { useHistory } from "react-router";
import { setStoredCredentials } from "../credentials";
import apiprefix from '../apiprefix'


const styles = (theme) => ({
  centered: {
    margin: "0 auto", // https://learnlayout.com/max-width.html
    maxWidth: 500,
  },
  centerChildren: {
    justifyContent: "center",
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  media: {
    height: 200,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
});

let LoginForm = ({ classes, currentUser, updateUser }) => {
  const history = useHistory();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const loginUser = async () => {
    let res = await makeAPICall(
      "POST",
      apiprefix + `/api/users/login`,
      values
    );
    let body = await res.json();
    if (res.status === 200) {
      setStoredCredentials(body.token);
      const user = {
        _id: body._id,
        username: body.username,
        authenticated: true,
      };
      updateUser(user);
      history.push("/home");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(values);
  };

  const handleChange = (event) => {
    let { name, value } = event.target; // name/value from input element that changed
    setValues({ ...values, [name]: value }); // update corresponding field in values object
  };

  return (
    <Box m={2} pt={3}>
      <Card className={classes.centered} margin="narrow">
        <CardMedia className={classes.media} image={vt} title="VT" />
        <form id="loginform" onSubmit={handleSubmit}>
          <CardContent>
            <TextField
              autoFocus
              margin="normal"
              name="username"
              label="Username"
              type="text"
              fullWidth
              value={values.username}
              onChange={(event) => handleChange(event)}
            />
            <TextField
              autoFocus
              margin="normal"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={values.password}
              onChange={(event) => handleChange(event)}
            />
            <CardActions>
              <Button
                className={classes.centered}
                variant="text"
                color="primary"
                type="submit"
              >
                Submit!
              </Button>
            </CardActions>
          </CardContent>
        </form>
      </Card>
    </Box>
  );
};
LoginForm = withStyles(styles)(LoginForm);
export default LoginForm;
