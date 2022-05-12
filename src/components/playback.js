//React
import React, { useState, useEffect } from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { setURI } from "../redux/spotifySlice";

//Material UI
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box"

import SpotifyPlayer from "react-spotify-web-playback"

//spotify helpers
import { 
  GetRecentlyPlayed 
} from "../util/spotifyHelper";


//CSS styles
const styles = makeStyles({
  playback: {
    position: "fixed",
    height: "90px",
    width: "100vw",
    borderTop: "1px solid #303030",
    left: "0",
    bottom: "0",
    display: "flex",
  }
});

export default function Playback() {

  const dispatch = useDispatch();

  //Get access token from redux
  const access_token = useSelector((state) => state.user.access_token);
  //Get current URI
  const URI = useSelector((state) => state.spotify.URI)

  const [play, setPlay] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  //MUI classes
  const classes = styles();

  useEffect(() => {

    if(firstLoad) {
      URI && setFirstLoad(false);
    } else {
      setPlay(true);
    }

  }, [URI])

  useEffect(() => {

    GetRecentlyPlayed(access_token).then(res => {
      let context = res.items[0].context
      let context_uri = context && context.uri;
      let track_uri = res.items[0].track.uri;
      dispatch(setURI(context_uri !== null ? context_uri : track_uri))
    });
  }, [])

  return (
    <Box className={classes.playback}>
       {access_token &&
       <SpotifyPlayer
        token={access_token}
        showSaveIcon
        magnifySliderOnHover
        callback={state => !state.isPlaying && setPlay(false)}
        play={play}
        uris={URI ? [URI] : []}
        styles={{
          activeColor: "#fff",
          bgColor: "#191414",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          height: "90px",
        }}
    />}
      
    </Box>
  );
}
