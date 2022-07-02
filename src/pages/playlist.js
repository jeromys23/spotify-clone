import React from 'react';

//Graphql
import { GetPlaylistInfo } from '../graphql/playlistQuery';
import { useQuery } from '@apollo/client';

//To get id from url
import { useParams } from 'react-router-dom';

//MUI
import { useGlobalStyles } from '../Styles';

import Box from '@mui/material/Box';

//Components
import Tracklist from '../components/tracklist';
import Playbutton from '../components/playbutton';
import GeneralPageLayout from '../components/generalpagelayout';
import ContentContainer from '../components/contentcontainer';
import Loading from '../components/loading';

export default function Playlist() {
    let { slug } = useParams();

    const classes = useGlobalStyles();

    //Get playlist info from id in url
    const { loading, error, data } = useQuery(GetPlaylistInfo, {
        variables: {
            playlistId: slug,
        },
    });

    if (loading) return <Loading />;
    if (error) return error.message;

    //Parse data for image and name
    function GetPageLayoutData(playlist) {
        let image =
            playlist.images.length >= 2
                ? playlist.images[1].url
                : playlist.images[playlist.images.length - 1].url;

        return {
            image,
            name: playlist.name,
        };
    }

    //Spotify response is a bit different for playlists than artists and other responses,
    //Need to map the JSON to be consistent
    function NormalizeTracks(tracks) {
        return tracks.items
            .filter((items) => items.track)
            .map((item) => item.track);
    }

    return (
        <Box>
            <ContentContainer image={data.Playlist.images[0].url}>
                <GeneralPageLayout
                    data={GetPageLayoutData(data.Playlist)}
                    type={'playlist'}
                >
                    <b>{data.Playlist.owner.display_name}</b>
                    &nbsp;&nbsp;&#8226;&nbsp;&nbsp;
                    {
                        data.Playlist.tracks.items.filter(
                            (items) => items.track
                        ).length
                    }{' '}
                    Songs
                </GeneralPageLayout>

                <Box className={classes.playlistContainer}>
                    <Box className={classes.playButtonContainer}>
                        <Playbutton uri={data.Playlist.uri} />
                    </Box>
                    <Tracklist
                        tracks={NormalizeTracks(data.Playlist.tracks)}
                        isAlbum={false}
                    />
                </Box>
            </ContentContainer>
        </Box>
    );
}
