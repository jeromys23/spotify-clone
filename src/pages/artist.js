import React, {useState, useEffect} from 'react'

//To get id from url
import { useParams } from "react-router-dom";

//Grpahql 
import { useQuery } from '@apollo/client';
import { GetArtistInfo } from '../graphql/artistQuery'


//MUI
import Box from "@material-ui/core/Box"

//components
import GeneralPageLayout from '../components/generalpagelayout';
import Playbutton from '../components/playbutton';
import Tracklist from '../components/tracklist';
import ItemGrid from '../components/itemGrid';
import ContentContainer from '../components/contentcontainer';
import Loading from "../components/loading"

import { useGlobalStyles } from '../Styles';

export default function Artist() {

  const classes = useGlobalStyles();

  let { slug } = useParams();
   
  const { loading, error, data } = useQuery(GetArtistInfo, {
    variables:  {
      artistId: slug
    },
  })

  if(loading) return <Loading/>
  if(error) return error.message;

  function GetPageLayoutData(artist) {
    let image = artist.images.length >= 2 ? artist.images[1].url : artist.images[artist.images.length - 1].url;

    return {
      image,
      name: artist.name
    }
  }
  

  return (
    <Box>

      <ContentContainer image={data.Artist.images.length >= 2 ? data.Artist.images[1].url : data.Artist.images[data.Artist.images.length - 1].url}>

        <GeneralPageLayout data={GetPageLayoutData(data.Artist)} type={'artist'}>
            <b>{data.Artist.followers.total.toLocaleString("en-US")} </b> &nbsp;Followers
        </GeneralPageLayout>

        <Box className={classes.playlistContainer}>
          <Box className={classes.playButtonContainer}>
            <Playbutton tracks={data.ArtistTopSongs.tracks} uri={data.Artist.uri} />
          </Box>
          <Box className={classes.topic}>Top Tracks</Box>
          <Tracklist tracks={data.ArtistTopSongs.tracks.slice(0,5)} isAlbum={false} />

          <Box>
            <Box className={classes.topic}>Albums</Box>
            <ItemGrid items={data.ArtistAlbums.items} metadata={'year'}/>
          </Box>
        </Box>

      </ContentContainer>
    </Box>
  )
}



/**
 * 
    /** 
    // const [artist, setArtist] = useState();
    // const [bg, setBg] = useState();
    // const [artistData, setArtistData] = useState();
    // const [artistTopSongs, setArtistTopSongs] = useState();
    // const [artistAlbums, setArtistAlbums] = useState();

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

    // useEffect(() => {
    //     if (slug) {
    //       GetArtist(access_token, slug).then((res) => setArtist(res));
    //       GetArtistTopSongs(access_token, slug).then((res) => console.log(res));
    //       GetArtistTopSongs(access_token, slug).then((res) => setArtistTopSongs(res));
    //       GetArtistAlbums(access_token, slug).then((res) => setArtistAlbums(res));
    //     }

    //   }, [slug]);
    */
 

