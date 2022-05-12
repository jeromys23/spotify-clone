//React
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import Profile from "./profile.js";
import Home from "./home.js";
//Components
import Navbar from "../components/navbar.js";
import Playback from "../components/playback.js";
import Playlist from "./playlist.js";
import Artist from "./artist.js"
import Album from "./album.js";

//Spotify helpers
import { GetCurrentlyPlaying, GetPlayerInfo, GetRecentlyPlayed } from "../util/spotifyHelper"

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setPlayerInfo, setRecentlyPlayed, setCurrentlyPlaying } from "../redux/spotifySlice.js";

export default function Dashboard() {

  const dispatch = useDispatch();

  const access_token = useSelector((state) => state.user.access_token);

  // //Get information for spotify player
  // useEffect(() => {
  //   GetPlayerInfo(access_token).then((res) => dispatch(setPlayerInfo(res)));
  //   GetCurrentlyPlaying(access_token).then((res) => dispatch(setCurrentlyPlaying(res)));
  //   GetRecentlyPlayed(access_token).then((res) => dispatch(setRecentlyPlayed(res)));
  // }, [])
  

  return (
    <div>
      <Router>
        <Navbar />
        <Playback />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/playlist/:slug" component={Playlist}/>
            <Route path="/artist/:slug" component={Artist}/>
            <Route path="/album/:slug" component={Album}/>
          </Switch>
      </Router>
    </div>
  );
}
