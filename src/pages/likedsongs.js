import React from 'react';

//MUI
import Box from '@material-ui/core/Box';

//GraphQL
import { useQuery } from '@apollo/client';
import { GetUserLikedSongs } from '../graphql/likedSongsQuery';

//Components
import ContentContainer from '../components/contentcontainer';
import GeneralPageLayout from '../components/generalpagelayout';
import Tracklist from '../components/tracklist';
import Loading from '../components/loading';

import { useGlobalStyles } from '../Styles';

export default function LikedSongs() {
    const classes = useGlobalStyles();

    //GraphQL Query for top songs and artists
    const { loading, error, data } = useQuery(GetUserLikedSongs);

    if (loading) return <Loading />;
    if (error) return error.message;

    return (
        <Box>
            <ContentContainer
                image={data.UserLikedSongs.items[0].track.album.images[1].url}
            >
                <GeneralPageLayout
                    data={{ name: 'Liked Songs' }}
                    type={'playlist'}
                ></GeneralPageLayout>

                <Box className={classes.playlistContainer}>
                    <Tracklist
                        tracks={data.UserLikedSongs.items.map(
                            (item) => item.track
                        )}
                        isAlbum={false}
                    />
                </Box>
            </ContentContainer>
        </Box>
    );
}
