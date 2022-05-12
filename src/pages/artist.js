import React, {useState, useEffect} from 'react'

//To get id from url
import { useParams } from "react-router-dom";

//Spotify api call
import { GetArtist, GetArtistTopSongs, GetArtistAlbums } from "../util/spotifyHelper"

//Redux
import { useSelector } from "react-redux";

//MUI
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"

//components
import GeneralPageLayout from '../components/generalpagelayout';
import Playbutton from '../components/playbutton';
import Tracklist from '../components/tracklist';
import AlbumGrid from '../components/albumGrid';
import ContentContainer from '../components/contentcontainer';

import FastAverageColor from 'fast-average-color';

import { makeStyles } from "@material-ui/core/styles";


//styles
const styles = makeStyles({
    playlistContainer: {
      background: "rgba(0, 0, 0, 0.25)",
      flex: 1
    },
    topic: {
      fontSize: '25px',
      fontWeight: 'bold',
      margin: '25px 0 20px 0'
    }
  });

export default function Artist() {

    const classes = styles();

    const access_token = useSelector((state) => state.user.access_token);
    let { slug } = useParams();

    const [artist, setArtist] = useState();
    const [bg, setBg] = useState();
    const [artistData, setArtistData] = useState();
    const [artistTopSongs, setArtistTopSongs] = useState();
    const [artistAlbums, setArtistAlbums] = useState();

    useEffect(() => {
      if(artist) {
        
        let image = artist.images.length >= 2 ? artist.images[1].url : artist.images[artist.images.length - 1].url;

        let data = {
          image,
          name: artist.name
        }

        const fac = new FastAverageColor();

        fac.getColorAsync(image)
        .then(color => {
          let colorString = `linear-gradient(0deg, rgba(25, 20, 20, 1) 0%, ${color.rgba} 100%)`
          setBg(colorString);

        })
        .catch(e => {
            console.log(e);
        });
        
        setArtistData(data);

      }
    }, [artist])

    useEffect(() => {
        if (slug) {
          GetArtist(access_token, slug).then((res) => setArtist(res));
          GetArtistTopSongs(access_token, slug).then((res) => setArtistTopSongs(res));
          GetArtistAlbums(access_token, slug).then((res) => setArtistAlbums(res));
        }

      }, [slug]);


  return (
    <Box>
      {artist && artistData && bg &&
      <ContentContainer bg={bg}>

        <GeneralPageLayout data={artistData} type={'artist'}>
            <b>{artist.followers.total.toLocaleString("en-US")} </b> &nbsp;Followers
        </GeneralPageLayout>

        {artistTopSongs && 
        <Box className={classes.playlistContainer} padding={"30px"}>

          <Playbutton tracks={artistTopSongs.tracks} uri={artist.uri} />
          <Box className={classes.topic}>Top Tracks</Box>
          <Tracklist tracks={artistTopSongs.tracks.slice(0,5)} showDateAdded={false} isAlbum={false} />

          {artistAlbums.items.length > 0 &&
          <Box>
            <Box className={classes.topic}>Albums</Box>
            {artistAlbums && 
            <Grid fluid spacing={2}>
              <AlbumGrid albums={artistAlbums.items}/>
            </Grid>}
          </Box>}
        </Box>}

      </ContentContainer>}
    </Box>
  )
}


      // <Box className={classes.content}>    
      //   <Box
      //     sx={{
      //     background: bg,
      //     zIndex: "-999",
      //     height: '100%',
      //     width: '100%',
      //     right: 0,
      //     top: 0,
      //     position: 'absolute'
      //   }}></Box>