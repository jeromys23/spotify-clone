//React
import React, { useState, useEffect, useRef } from "react";

//Redux
import { useSelector } from "react-redux";

//Material UI
import { makeStyles } from "@material-ui/core";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import axios from "axios";

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
    justifyContent: "center",
    alignItems: "center",
  },
  playbackButtons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Playback() {
  //Get access token from redux
  const access_token = useSelector((state) => state.user.access_token);

  const [firstPlay, setFirstPlay] = useState(true);

  //MUI classes
  const classes = styles();

  //Spotify player html reference
  let spotifyPlayer = useRef(null);

  /** PLAYER INIT */
  /********************/

  //Initialize spotify player
  const initializePlayer = () => {
    spotifyPlayer = new window.Spotify.Player({
      name: "Spotify Player",
      getOAuthToken: (callback) => {
        callback(access_token);
      },
    });

    // Error handling
    spotifyPlayer.addListener("initialization_error", ({ message }) => {
      console.log(message);
    });
    spotifyPlayer.addListener("authentication_error", ({ message }) => {
      console.log(message);
    });
    spotifyPlayer.addListener("account_error", ({ message }) => {
      console.log(message);
    });
    spotifyPlayer.addListener("playback_error", ({ message }) => {
      console.log(message);
    });

    // Ready
    spotifyPlayer.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      setDeviceId(device_id);
    });

    // Playback status updates
    spotifyPlayer.addListener("player_state_changed", (state) => {
      try {
        if (state) {
          const {
            duration,
            loading,
            paused,
            position,
            repeat_mode,
            shuffle,
            track_window,
          } = state;
          //setCurrentTrack({ ...current_track, play: !paused });
          setPlayback((state) => ({
            ...state,
            loaded: true,
            loading: loading,
            playing: !paused,
            shuffle: shuffle,
            repeat: repeat_mode !== 0,
            progress: position,
            duration: duration,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    });

    spotifyPlayer.connect();
  };

  function loadSpotifyPlayer() {
    return new Promise((resolve, reject) => {
      const scriptTag = document.getElementById("spotify-player");

      if (!scriptTag) {
        const script = document.createElement("script");

        script.id = "spotify-player";
        script.type = "text/javascript";
        script.async = false;
        script.defer = true;
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.onload = () => resolve();
        script.onerror = (error) =>
          reject(new Error(`loadScript: ${error.message}`));

        document.head.appendChild(script);
      } else {
        resolve();
      }
    });
  }

  //   // Not Ready
  //   spotifyPlayer.addListener("not_ready", ({ device_id }) => {
  //     console.log("Device ID has gone offline", device_id);
  //   });

  // Connect the player!
  // };
  /********************/

  //Initialize states
  const [deviceId, setDeviceId] = useState();
  const [playback, setPlayback] = useState({
    loaded: false,
    loading: false,
    playing: false,
    shuffle: false,
    repeat: false,
    progress: 0,
    duration: 0,
  });
  const [currentTrack, setCurrentTrack] = useState();

  //Toggle user play
  const play = () => {
    axios
      .put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        { context_uri: "spotify:artist:5Pb27ujIyYb33zBqVysBkj" },
        { headers: { Authorization: "Bearer " + access_token } }
      )
      .catch((err) => {
        console.error("error: ", err);
      });
  };

  //Toggle user pause
  const pause = () => {
    axios
      .put("https://api.spotify.com/v1/me/player/pause", null, {
        headers: { Authorization: "Bearer " + access_token },
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  useEffect(async () => {

    window.onSpotifyWebPlaybackSDKReady = () => {
      initializePlayer();
    };

    if(!window.Spotify){
      await loadSpotifyPlayer();
    } 

  
    //get last played song
    axios
      .get("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
        headers: { Authorization: "Bearer " + access_token },
      })
      .then((response) => {
        let { items } = response.data;
        let track = items[0].track;
        setCurrentTrack(track.uri);
      })
      .catch((e) => {
        console.log(e);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.playback}>
      <div className={classes.playbackButtons}>
        {playback.loaded && playback.playing ? (
          <div onClick={() => pause()}>
            <PauseCircleIcon fontSize={"large"} />
          </div>
        ) : (
          <div onClick={() => play()}>
            <PlayCircleIcon fontSize={"large"} />
          </div>
        )}
      </div>
    </div>
  );
}
