//React
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import Home from "./home.js";
import Playlist from "./playlist.js";
import Artist from "./artist.js"
import Album from "./album.js";
import LikedSongs from "./likedsongs"
import Playlists from "./playlists.js";

//Components
import Navbar from "../components/navbar.js";
import Playback from "../components/playback.js";


export default function Dashboard() {

  return (
    <div>
      <Router>
        <Navbar />
        <Playback />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/playlist/:slug" component={Playlist}/>
            <Route path="/artist/:slug" component={Artist}/>
            <Route path="/album/:slug" component={Album}/>
            <Route path="/likedsongs" component={LikedSongs}/>
            <Route path="/playlists" component={Playlists}/>
          </Switch>
      </Router>
    </div>
  );
}
