import axios from "axios";
import React, { useEffect, useState } from "react";

//Spotify util
import { GetPlaylist, PlayerPlayWithContext } from "../util/spotifyHelper";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { setURI } from "../redux/spotifySlice";

//To get id from url
import { useParams } from "react-router-dom";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";

//Components
import Tracklist from "../components/tracklist";
import Playbutton from "../components/playbutton";
import GeneralPageLayout from "../components/generalpagelayout";
import ContentContainer from "../components/contentcontainer";


import FastAverageColor from 'fast-average-color';


//styles
const styles = makeStyles({
  playlistContainer: {
    background: "rgba(0, 0, 0, 0.25)",
    flex: 1
  },
});

export default function Playlist() {
  const access_token = useSelector((state) => state.user.access_token);
  let { slug } = useParams();

  const [playlist, setPlaylist] = useState();
  const [playlistData, setPlaylistData] = useState();
  const [bg, setBg] = useState();
  const [tracks, setTracks] = useState();

  const classes = styles();
  const dispatch = useDispatch();

  useEffect(() => {
    if(playlist) {
      let data = {
        image: playlist.images[0].url,
        name: playlist.name
      }

      const fac = new FastAverageColor();

      fac.getColorAsync(data.image)
      .then(color => {
        let colorString = `linear-gradient(0deg, rgba(25, 20, 20, 1) 0%, ${color.rgba} 100%)`
        setBg(colorString);

      })
      .catch(e => {
          console.log(e);
      });
      
      setPlaylistData(data)
    }
  }, [playlist])


  useEffect(() => {
    playlist && setTracks(playlist.tracks.items.filter(items => items.track).map(item => item.track))
  }, [playlist])


  useEffect(() => {
    if (slug) {
      GetPlaylist(access_token, slug).then((res) => setPlaylist(res));
    }

  }, [slug]);


  return (
    <Box>
      {playlist && playlistData && bg &&
      <ContentContainer bg={bg}>  

          <GeneralPageLayout data={playlistData} type={'playlist'}>
              <b>{playlist.owner.display_name}</b>
              &nbsp;&nbsp;&#8226;&nbsp;&nbsp;{playlist.tracks.items.filter(items => items.track).length} Songs
          </GeneralPageLayout>
        
          <Box className={classes.playlistContainer} padding={"30px"}>
            <Playbutton tracks={tracks} uri={playlist.uri} />
            <Tracklist tracks={tracks} showDateAdded={true} isAlbum={false}/>
          </Box>
          
      </ContentContainer>}
    </Box>
  );
}
