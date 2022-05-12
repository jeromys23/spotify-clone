//React
import React, { useEffect, useState } from "react";

//Redux
import { useSelector } from "react-redux";

//components
import GeneralPageLayout from "../components/generalpagelayout";
import ContentContainer from "../components/contentcontainer";
import Tracklist from "../components/tracklist";


//MUI
import Box from "@material-ui/core/Box";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'

//Styles
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

//Spotify helpers
import { GetUserTopArtists, GetUserTopTracks, LAST4WEEKS, LAST6MONTHS, ALLTIME } from "../util/spotifyHelper";

const styles = makeStyles({
  homeContainer: {
    background: "rgba(0, 0, 0, 0.25)",
    flex: 1
  },
  topic: {
    fontSize: '25px',
    fontWeight: 'bold',
    margin: '25px 0 20px 0'
  }
});

export default function Home() {
  const access_token = useSelector((state) => state.user.access_token);

  const classes = styles();

  //States for each time frame for both artists and genres
  const [tracksShortFrame, setTracksShortFrame] = useState();
  const [tracksMediumFrame, setTracksMediumFrame] = useState();
  const [tracksLongFrame, setTracksLongFrame] = useState();

  const [artistsShortFrame, setArtistsShortFrame] = useState();
  const [artistsMediumFrame, setArtistsMediumFrame] = useState();
  const [artistsLongFrame, setArtistsLongFrame] = useState();

  //State for tabs
  const [value, setValue] = useState(0);


  
  //Background - spotify color
  const bg = `linear-gradient(0deg, rgba(25, 20, 20, 1) 0%, rgba(11,77,33,1) 100%)`

  useEffect(() => {
    GetUserTopArtists(access_token, LAST4WEEKS).then(res => setArtistsShortFrame(res));
    GetUserTopArtists(access_token, LAST6MONTHS).then(res => setArtistsMediumFrame(res));
    GetUserTopArtists(access_token, ALLTIME).then(res => setArtistsLongFrame(res));

    GetUserTopTracks(access_token, LAST4WEEKS).then(res => setTracksShortFrame(res));
    GetUserTopTracks(access_token, LAST6MONTHS).then(res => setTracksMediumFrame(res));
    GetUserTopTracks(access_token, ALLTIME).then(res => setTracksLongFrame(res));

  }, []);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  //MUI tab panels
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  


  return (

    <Box>
      <ContentContainer bg={bg}>  

          <GeneralPageLayout data={{name: 'Your Favorite Music'}} type={''}>
          </GeneralPageLayout>

          <Box className={classes.homeContainer} padding={"30px"}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab disableRipple label="Last 4 Weeks" />
              <Tab disableRipple label="Last 6 Months" />
              <Tab disableRipple label="All Time" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Box className={classes.topic}>Top Tracks</Box>
              {tracksShortFrame && <Tracklist tracks={tracksShortFrame.items} showDateAdded={false} isAlbum={false}/>}
              <Box className={classes.topic}>Top Artists</Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box className={classes.topic}>Top Tracks</Box>
              {tracksMediumFrame && <Tracklist tracks={tracksMediumFrame.items} showDateAdded={false} isAlbum={false}/>}
              <Box className={classes.topic}>Top Artists</Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Box className={classes.topic}>Top Tracks</Box>
              {tracksLongFrame && <Tracklist tracks={tracksLongFrame.items} showDateAdded={false} isAlbum={false}/>}
              <Box className={classes.topic}>Top Artists</Box>
            </TabPanel>
          </Box>
          
      </ContentContainer>
    </Box>
  );
}
