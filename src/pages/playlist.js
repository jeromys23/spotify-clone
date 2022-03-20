import axios from "axios";
import React, { useEffect, useState } from "react";

//Spotify util
import { GetPlaylist } from "../util/spotifyHelper";

//Redux
import { useSelector } from "react-redux";

//To get id from url
import { useParams } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

//Components
import Tracklist from "../components/tracklist";
import Playbutton from "../components/playbutton";

import randomColor from "randomcolor";

//styles
const styles = makeStyles({
  content: {
    width: "calc(100vw - 225px)",
    position: "absolute",
    right: 0,
    top: 0,
    height: "calc(100vh - 90px)",
    overflowY: "scroll",
    marginLeft: 200,
  },
  playlistContainer: {
    background: "rgba(0, 0, 0, 0.25)",
  },
  header: {
    fontSize: "90px",
    fontWeight: "bold",
    position: "relative",
    paddingBottom: "20px",
  },
  playlistImage: {
    height: "250px",
    width: "250px",
    boxShadow: "0 0 25px #101010",
  },
  topHeader: {
    display: "flex",
    paddingTop: "80px",
  },
  background: {
    background:
      "linear-gradient(0deg, rgba(25, 20, 20, 1) 0%, rgba(169, 92, 104, 1) 100%)",
    zIndex: -999,
  },
  metadata: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "30px",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

export default function Playlist() {
  const access_token = useSelector((state) => state.user.access_token);
  let { slug } = useParams();
  
  const [playlist, setPlaylist] = useState();
  const [bg, setBg] = useState();

  const classes = styles();

  useEffect(() => {
    if (slug) {
      GetPlaylist(access_token, slug).then((res) => setPlaylist(res));
    }

    let color = randomColor({format: 'rgba'});
    let colorString = `linear-gradient(0deg, rgba(25, 20, 20, 1) 0%, ${color} 100%)`
    setBg(colorString);
  }, [slug]);

  return (
    <Box>
      <Box className={classes.content}>
        <Box
          sx={{
            background: bg,
            zIndex: "-999",
            height: '100%',
            width: '100%',
            right: 0,
            top: 0,
            position: 'absolute'
          }}
        ></Box>
        {playlist ? (
          <Box>
            <Box
              className={classes.topHeader}
              px={"30px"}
              paddingBottom={"30px"}
            >
              <Box className={classes.playlistImage}>
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  height={"250px"}
                  width={"250px"}
                />
              </Box>
              <Box position={"relative"} width={"100%"}>
                <Box className={classes.metadata}>
                  <Box className={classes.header}>{playlist.name}</Box>
                  <Box>
                    <b>{playlist.owner.display_name}</b>
                    &nbsp;&nbsp;&#8226;&nbsp;&nbsp;{playlist.tracks.total} Songs
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.playlistContainer} padding={"30px"}>
              <Playbutton tracks={playlist.tracks.items} />
              <Tracklist props={playlist.tracks.items} />
            </Box>
          </Box>
        ) : (
          <Skeleton variant="rectangular" width={"100%"} height={"75%"} />
        )}
      </Box>
    </Box>
  );
}
