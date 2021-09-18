import React, { useState } from "react";
import ButtonAppBar from "./components/ButtonAppBar";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import theme from "./vt-theme";
import {
  decodeUserObjectFromStoredCredentials,
  clearStoredCredentials,
  decodeUserObjectFromStoredCredentials2,
  clearStoredCredentials2,
} from "./credentials";
import Student from "./components/Student";
import Faculty from "./components/Faculty";
import Room from "./components/Room";
import AllStudent from "./components/AllStudent";
import Checkin from "./components/Checkin";
import { useLocation } from "react-router-dom";

function App() {
  let [currentUser, updateUser] = useState(() =>
    decodeUserObjectFromStoredCredentials()
  );
  let [currentUser2, updateUser2] = useState(() =>
    decodeUserObjectFromStoredCredentials2()
  );
  function PrivateRoute({ children, ...rest }) {
    const location = useLocation();
    if (location.pathname.includes("/home/student")) {
      clearStoredCredentials2();
    }
    return (
      <Route
        {...rest}
        render={() => {
          return currentUser.authenticated == true ? (
            children
          ) : (
            <Redirect to="/" />
          );
        }}
      />
    );
  }
  function AdminRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={() => {
          return currentUser2.authenticated == true ? (
            children
          ) : (
            <Redirect to="/home" />
          );
        }}
      />
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
        <ButtonAppBar currentUser={currentUser}>
          <Route exact path="/" label="Login">
            <LoginForm
              currentUser={currentUser}
              updateUser={updateUser}
            ></LoginForm>
          </Route>
          <PrivateRoute exact path="/home" label="Home">
            <Home currentUser={currentUser} updateUser={updateUser2} />
          </PrivateRoute>
          <Route
            exact
            path="/logout"
            render={() => {
              clearStoredCredentials();
              clearStoredCredentials2();
              // force hard refresh
              window.location.href = `${process.env.PUBLIC_URL}/`;
            }}
          />
        </ButtonAppBar>
        <PrivateRoute exact path="/home/student" label="Rooms">
          <Student currentUser={currentUser} updateUser={updateUser}></Student>
        </PrivateRoute>
        <AdminRoute exact path="/home/faculty" label="Rooms">
          <Faculty currentUser={currentUser2}></Faculty>
        </AdminRoute>
        <AdminRoute exact path="/home/faculty/:id" label="Rooms">
          <Room></Room>
        </AdminRoute>
        <AdminRoute exact path="/home/faculty/records/all" label="Rooms">
          <AllStudent></AllStudent>
        </AdminRoute>
        <PrivateRoute exact path="/home/student/:id" label="Rooms">
          <Checkin></Checkin>
        </PrivateRoute>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
