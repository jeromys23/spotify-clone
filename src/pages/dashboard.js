//React
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import Profile from "./profile.js";
import Home from "./home.js";
//Components
import Navbar from "../components/navbar.js";
import Playback from "../components/playback.js";
import Playlist from "./playlist.js";

export default function Dashboard() {
  return (
    <div>
      <Router>
      <Navbar />
      <Playback />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/playlist/:slug" component={Playlist}/>
        </Switch>
      </Router>
    </div>
  );
}
