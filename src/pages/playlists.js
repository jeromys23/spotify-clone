import React from 'react';
import { Link } from 'react-router-dom';

//Graphql
import { GetUserPlaylists } from '../graphql/navQuery';
import { useQuery } from '@apollo/client';

//MUI
import { makeStyles } from '@material-ui/core/styles';

import Box from '@mui/material/Box';

//Components
import ContentContainer from '../components/contentcontainer';
import Loading from '../components/loading';

const styles = makeStyles({
    playlistImage: {
        height: '45px',
        width: '45px',
        marginRight: '15px',
    },
    playlistItem: {
        padding: '7px 30px',
        width: '100%',
        display: 'flex',
    },
    topic: {
        fontSize: '25px',
        fontWeight: 'bold',
        margin: '25px 0 20px 0',
    },
});

export default function Playlists() {
    //GraphQL for getting all user's playlists
    const { loading, error, data } = useQuery(GetUserPlaylists);

    if (loading) return <Loading />;
    if (error) return error.message;

    const classes = styles();

    return (
        <ContentContainer>
            <Box className={classes.topic} paddingLeft={'30px'}>
                Playlists
            </Box>
            {data.UserPlaylists.items.map((playlist, i) => (
                <Link
                    to={`/playlist/${playlist.id}`}
                    className={classes.navbarLink}
                >
                    <Box className={classes.playlistItem} key={i}>
                        <Box className={classes.playlistImage}>
                            <img
                                className={classes.playlistImage}
                                src={
                                    playlist.images[playlist.images.length - 1]
                                        .url
                                }
                                alt={playlist.name}
                                loading={'lazy'}
                            />
                        </Box>
                        <Box className={classes.playlistText}>
                            <Box fontSize={'17px'} paddingBottom={'2px'}>
                                {' '}
                                {playlist.name}
                            </Box>
                            <Box
                                paddingTop={'2px'}
                                fontSize={'14px'}
                                color={'#CCCCCC'}
                            >
                                Playlist&nbsp;&#8226;&nbsp;{' '}
                                {playlist.owner.display_name}
                            </Box>
                        </Box>
                    </Box>
                </Link>
            ))}
        </ContentContainer>
    );
}
