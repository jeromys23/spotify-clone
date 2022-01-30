//React
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Material UI
import { makeStyles } from "@material-ui/core/styles";

//Redux
import { useSelector, useDispatch } from "react-redux";

//Pages
import Profile from "./profile.js";
import Home from "./home.js";
//Components
import Navbar from "../components/navbar.js";
import Playback from "../components/playback.js";

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <Home />
      <Playback />
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
