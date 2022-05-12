import React, {useState, useEffect} from 'react'

//To get id from url
import { useParams } from "react-router-dom";

//Spotify api call
import { GetAlbum } from "../util/spotifyHelper"

//Redux
import { useSelector } from "react-redux";

//MUI
import Box from "@material-ui/core/Box"

//components
import GeneralPageLayout from '../components/generalpagelayout';
import Playbutton from '../components/playbutton';
import Tracklist from '../components/tracklist';
import { Link } from 'react-router-dom';
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
    },
    artistLink: {
        textDecoration: 'none',
        color: '#fff',
        "&:hover": {
          textDecoration: "underline"
        }
      }
  });

export default function Album() {

    const classes = styles();

    const access_token = useSelector((state) => state.user.access_token);
    let { slug } = useParams();

    const [album, setAlbum] = useState();
    const [albumData, setAlbumData] = useState();
    const [bg, setBg] = useState();

    useEffect(() => {
      if(album) {
        
        let image = album.images.length >= 2 ? album.images[1].url : album.images[album.images.length - 1].url;

        let data = {
          image,
          name: album.name
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
        
        setAlbumData(data);

      }
    }, [album])

    useEffect(() => {
        if (slug) {
          GetAlbum(access_token, slug).then((res) => setAlbum(res));
        }
      }, [slug]);


  return (
    <Box>
      {album && albumData && bg &&
       <ContentContainer bg={bg}>

          <GeneralPageLayout data={albumData} type={album.album_type}>
              <Box display={'flex'}>
                  {album.artists.map((artist, index, artists) =>
                      <React.Fragment>
                        <Link className={classes.artistLink} to={`/artist/${artist.id}`}>{artist.name}</Link> 
                        {index === artists.length - 1 ? "" : ", "}
                      </React.Fragment>
                  )}
                  &nbsp;&#8226;&nbsp;
                  {new Date(album.release_date).toLocaleDateString('en-US', {year: 'numeric'})}
              </Box>
          </GeneralPageLayout>

          {album && album.tracks.items.length > 0 && 
          <Box className={classes.playlistContainer} padding={"30px"}>
            <Playbutton tracks={album.tracks.items} uri={album.uri} />
            <Box className={classes.topic}>Tracks</Box>
            <Tracklist tracks={album.tracks.items} showDateAdded={false} isAlbum={true} />
          </Box>}

        </ContentContainer>}
    </Box>
  )
}