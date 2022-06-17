//React
import React, { useState, useEffect } from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { setURI, setPlaying } from "../redux/spotifySlice";

//Material UI
import { makeStyles } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from "@material-ui/core/Box"

import SpotifyPlayer from "react-spotify-web-playback"

//spotify helpers
import { 
  GetRecentlyPlayed 
} from "../util/spotifyHelper";



//CSS styles
const styles = makeStyles((theme) => ({
  playback: {
    position: "fixed",
    width: "100vw",
    borderTop: "1px solid #303030",
    left: "0",
    bottom: "0",
    display: "flex",
  }
}));

export default function Playback() {

  const dispatch = useDispatch();

  //Get access token from redux
  const access_token = useSelector((state) => state.user.access_token);
  //Get current URI
  const URI = useSelector((state) => state.spotify.URI);
  const isPlaying = useSelector((state) => state.spotify.isPlaying)


  const [playerHeight, setPlayerHeight] = useState('75px')
  const [firstLoad, setFirstLoad] = useState(true);

  //MUI classes
  const classes = styles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {

    if(firstLoad) {
      URI && setFirstLoad(false);
    } else {
      setPlaying(true);
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

  useEffect(() => {
    setPlayerHeight('75px')
    if(matches) {
      setPlayerHeight('210px')
    }
  }, [matches])

  function updateSpotifyState(state) {
    dispatch(setPlaying(state.isPlaying));
  }


  return (
    <Box className={classes.playback} height={playerHeight}>
       {access_token &&
       <SpotifyPlayer
        token={access_token}
        magnifySliderOnHover
        syncExternalDevice        
        callback={state => updateSpotifyState(state)}
        play={isPlaying}
        uris={URI ? [URI] : []}
        styles={{
          activeColor: "#fff",
          bgColor: "#191414",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          height: '75px',
        }}
    />}
      
    </Box>
  );
}
