//React
import React, { useState } from 'react';

//GraphQL
import { useQuery } from '@apollo/client';
import { GetUserTopMedia } from '../graphql/homeQuery';

//components
import GeneralPageLayout from '../components/generalpagelayout';
import ContentContainer from '../components/contentcontainer';
import Tracklist from '../components/tracklist';
import ItemGrid from '../components/itemGrid';
import Loading from '../components/loading';

//MUI
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//Styles
import { useGlobalStyles } from '../Styles';

//Spotify helpers
import { LAST4WEEKS, LAST6MONTHS, ALLTIME } from '../util/spotifyHelper';

export default function Home() {
    const classes = useGlobalStyles();

    //GraphQL Query for top songs and artists
    const { loading, error, data } = useQuery(GetUserTopMedia, {
        variables: {
            timeRangeShort: LAST4WEEKS,
            timeRangeMedium: LAST6MONTHS,
            timeRangeLong: ALLTIME,
        },
    });

    //State for tabs
    const [value, setValue] = useState(0);

    //Background - spotify color
    const bg = `linear-gradient(0deg, rgba(25, 20, 20, 1) 0%, rgba(11,77,33,1) 100%)`;

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    if (loading) return <Loading />;
    if (error) return error.message;

    return (
        <Box>
            <ContentContainer colorString={bg}>
                <GeneralPageLayout
                    data={{ name: 'Your Favorite Music' }}
                    type={''}
                ></GeneralPageLayout>

                <Box className={classes.playlistContainer}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='basic tabs example'
                    >
                        <Tab disableRipple label='Last 4 Weeks' />
                        <Tab disableRipple label='Last 6 Months' />
                        <Tab disableRipple label='All Time' />
                    </Tabs>
                    <Box style={{ display: value === 0 ? 'block' : 'none' }}>
                        <Box className={classes.topic}>Top Tracks</Box>
                        <Tracklist
                            tracks={data.ShortTermTracks.items}
                            isAlbum={false}
                        />

                        <Box className={classes.topic}>Top Artists</Box>
                        <ItemGrid items={data.ShortTermArtists.items} />
                    </Box>
                    <Box style={{ display: value === 1 ? 'block' : 'none' }}>
                        <Box className={classes.topic}>Top Tracks</Box>
                        <Tracklist
                            tracks={data.MediumTermTracks.items}
                            isAlbum={false}
                        />

                        <Box className={classes.topic}>Top Artists</Box>
                        <ItemGrid items={data.MediumTermArtists.items} />
                    </Box>
                    <Box style={{ display: value === 2 ? 'block' : 'none' }}>
                        <Box className={classes.topic}>Top Tracks</Box>
                        <Tracklist
                            tracks={data.LongTermTracks.items}
                            isAlbum={false}
                        />

                        <Box className={classes.topic}>Top Artists</Box>
                        <ItemGrid items={data.LongTermArtists.items} />
                    </Box>
                </Box>
            </ContentContainer>
        </Box>
    );
}
