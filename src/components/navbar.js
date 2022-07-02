//React
import React from 'react';
import { Link } from 'react-router-dom';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ListIcon from '@mui/icons-material/List';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

//Components
import Loading from '../components/loading';

//GraphQL
import { useQuery } from '@apollo/client';
import { GetUserPlaylists } from '../graphql/navQuery';

//Styles
const styles = makeStyles({
    navbar: {
        position: 'fixed',
        width: '225px',
        left: '0',
        top: '0',
        height: 'Calc(100vh - var(--player-height))',
        backgroundColor: '#121212',
        padding: '15px 0 0 15px',
        fontWeight: 'bold',
        fontSize: '14px',
        color: 'darkgrey',
        display: 'flex',
        flexDirection: 'column',
    },
    navlinkContainer: {
        position: 'relative',
        minHeight: '30px',
    },
    navlink: {
        position: 'absolute',
        top: '6px',
        left: '15px',
        width: '100px',
    },
    navContent: {
        display: 'flex',
        paddingBottom: '20px',
    },
    playlistContainer: {
        paddingLeft: '10px',
        height: '20px',
        marginTop: '20px',
    },
    greyDivider: {
        height: '1px',
        backgroundColor: '#303030',
        width: '100%',
    },
    icon: {
        color: 'darkgrey',
        fontSize: 27,
    },
    navbarLink: {
        color: 'inherit',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
            color: 'rgb(250, 250, 250)',
        },
    },
    navActive: {
        color: 'rgb(250, 250, 250)',
    },
    mobileContainer: {
        display: 'flex',
        backgroundColor: '#121212',
        fontWeight: 'bold',
        width: '100%',
        color: 'darkgrey',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        zIndex: 100,
    },
    mobileNavItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
});

/**
 * Desktop and mobile navbar containing user playlists
 * @returns
 */
export default function Navbar() {
    //Styles
    const classes = styles();

    //GraphQL Query for top songs and artists
    const { loading, error, data } = useQuery(GetUserPlaylists);

    if (loading) return <Loading />;
    if (error) return null;

    return (
        <React.Fragment>
            <Hidden smDown>
                <Box className={classes.navbar}>
                    <Box>
                        <Box className={classes.navContent}>
                            <HomeRoundedIcon className={classes.icon} />
                            <Box className={classes.navlinkContainer}>
                                <Link to={'/'} className={classes.navbarLink}>
                                    <Box className={classes.navlink}>Home</Box>
                                </Link>
                            </Box>
                        </Box>
                        <Box className={classes.navContent}>
                            <FavoriteSharpIcon className={classes.icon} />
                            <Box className={classes.navlinkContainer}>
                                <Link
                                    to={'/likedsongs'}
                                    className={classes.navbarLink}
                                >
                                    <Box className={classes.navlink}>
                                        Liked Songs
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                        <Box className={classes.greyBoxider}></Box>
                    </Box>
                    <Box className={'bottomNav'}>
                        {data.UserPlaylists.items.map((playlist, i) => (
                            <Box className={classes.playlistContainer} key={i}>
                                <Link
                                    to={`/playlist/${playlist.id}`}
                                    className={classes.navbarLink}
                                >
                                    <Box>{playlist.name}</Box>
                                </Link>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Hidden>
            <Hidden mdUp>
                <Box className={classes.mobileContainer}>
                    <Box className={classes.mobileNavItem}>
                        <Link to={'/'}>
                            <HomeRoundedIcon fontSize={'large'} />
                        </Link>
                    </Box>
                    <Box className={classes.mobileNavItem}>
                        <Link to={'/playlists'}>
                            <ListIcon fontSize={'large'} />
                        </Link>
                    </Box>
                </Box>
            </Hidden>
        </React.Fragment>
    );
}
