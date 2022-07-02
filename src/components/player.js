import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    setDeviceId,
    setCurrentSong,
    setShouldPlay,
    setURI,
} from '../redux/spotifySlice';

//Player commands
import { PlayPlayerContext, PausePlayer } from '../util/spotifyHelper';

//Material UI
import { makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Box from '@material-ui/core/Box';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

//CSS styles
const styles = makeStyles((theme) => ({
    player: {
        color: '#CCCCCC',
        position: 'fixed',
        width: '100vw',
        zIndex: 99,
        borderTop: '1px solid #303030',
        height: 'var(--player-height);',
        left: '0',
        display: 'flex',
    },
    currentSongContainer: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        gap: '20px',
        padding: '0 30px',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    artistAlbumLink: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'underline',
        },
        fontSize: '12px',
        cursor: 'pointer',
    },
    playerControls: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlIcon: {
        cursor: 'pointer',
        fontSize: '35px !important',
    },
    playPause: {
        cursor: 'pointer',
        fontSize: '40px !important',
        color: '#fff',
    },
    progressBar: {
        width: '100%',
        maxWidth: '500px',
        height: '2px',
        borderRadius: '1px',
        background: '#CCCCCC',
    },
}));

/**
 * Uses spotify web playback sdk to play songs, albums, artists and control playback
 * @returns
 */
export default function Player() {
    //MUI classes
    const classes = styles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const dispatch = useDispatch();
    const currentSong = useSelector((state) => state.spotify.currentSong);
    const shouldPlay = useSelector((state) => state.spotify.shouldPlay);
    const access_token = useSelector((state) => state.user.access_token);
    const deviceId = useSelector((state) => state.spotify.deviceId);
    const globalURI = useSelector((state) => state.spotify.URI);

    //GraphQL query
    // const [CurrentlyPlaying, { loading, error, data }] = useLazyQuery(
    //     GetCurrentlyPlaying,
    //     {
    //         onCompleted: (data) => {
    //             if (data.CurrentlyPlaying.item) {
    //                 dispatch(setCurrentSong(data.CurrentlyPlaying.item));
    //             }
    //         },
    //         onError: (err) => {
    //             console.error(
    //                 'Error ocurred when fetching currently playing. Likely nothing is playing. Error: ' +
    //                     err.message
    //             );
    //         },
    //         fetchPolicy: 'network-only',
    //     }
    // );

    const [player, setPlayer] = useState();
    const [isActive, setIsActive] = useState(false);

    const Pause = () => {
        if (player !== null) {
            player
                .pause()
                .then(() => console.log('paused'))
                .catch(() => PausePlayer(access_token, deviceId));
        } else {
            console.log('pausing through api');
            PausePlayer(access_token, deviceId);
        }
    };

    const Previous = () => {
        player && player.previousTrack();
    };

    const IsTrackURI = (uri) => {
        return uri.includes('track');
    };

    const Next = () => {
        //If the uri is a
        if (IsTrackURI(globalURI)) {
            const artistURI = currentSong.artists[0].uri;
            if (artistURI) {
                dispatch(setURI(artistURI));
            }
        } else {
            player && player.nextTrack();
        }
    };

    const Resume = () => {
        if (isActive) {
            player &&
                player
                    .resume()
                    .then(() => {
                        console.log('resumed');
                    })
                    .catch(() => {
                        PlayPlayerContext(access_token, deviceId, globalURI);
                    });
        } else {
            PlayPlayerContext(access_token, deviceId, globalURI);
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';

        document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = () => {
            const spotifyPlayer = new window.Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: (cb) => {
                    cb(access_token);
                },
                volume: 0.5,
            });

            setPlayer(spotifyPlayer);

            // Ready
            spotifyPlayer.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                dispatch(setDeviceId(device_id));
            });

            spotifyPlayer.addListener('player_state_changed', (state) => {
                if (state) {
                    if (state.track_window.current_track && !state.loading) {
                        dispatch(
                            setCurrentSong(state.track_window.current_track)
                        );
                    }
                }
                state && dispatch(setShouldPlay(!state.paused));

                player.getCurrentState().then((state) => {
                    !state ? setIsActive(false) : setIsActive(true);
                });
            });

            // Not Ready
            spotifyPlayer.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            spotifyPlayer.addListener('initialization_error', ({ message }) => {
                console.error(message);
            });

            spotifyPlayer.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });

            spotifyPlayer.addListener('account_error', ({ message }) => {
                console.error(message);
            });

            spotifyPlayer.connect();
        };
    }, []);

    useEffect(() => {
        if (shouldPlay) PlayPlayerContext(access_token, deviceId, globalURI);
    }, [globalURI]);

    if (!currentSong) return null;

    return (
        <Box
            className={classes.player}
            style={{ bottom: matches ? '60px' : '0' }}
        >
            {/* Image and playback box */}
            <Box className={classes.currentSongContainer}>
                <Box>
                    <img
                        src={
                            currentSong.album.images[
                                currentSong.album.images.length - 1
                            ].url
                        }
                        alt={currentSong.name}
                        width={64}
                        height={64}
                    />
                </Box>
                <Box width={300}>
                    <Box color={'#fff'} fontSize={'14px'}>
                        {currentSong.name}
                    </Box>
                    {currentSong.artists.map((artist, index, artists) => (
                        <React.Fragment key={index}>
                            {!matches && (
                                <Link
                                    className={classes.artistAlbumLink}
                                    to={`/artist/${artist.id}`}
                                >
                                    {artist.name}
                                </Link>
                            )}
                            {matches && (
                                <Box
                                    display={'inline'}
                                    className={classes.artistAlbumLink}
                                >
                                    {artist.name}
                                </Box>
                            )}
                            {index === artists.length - 1 ? '' : ', '}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
            {/* Playback controls */}
            <Box className={classes.playerControls}>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Box onClick={() => Previous()}>
                        <SkipPreviousIcon className={classes.controlIcon} />
                    </Box>
                    {shouldPlay ? (
                        <Box onClick={() => Pause()}>
                            <PauseCircleIcon className={classes.playPause} />
                        </Box>
                    ) : (
                        <Box onClick={() => Resume()}>
                            <PlayCircleIcon className={classes.playPause} />
                        </Box>
                    )}
                    <Box onClick={() => Next()}>
                        <SkipNextIcon className={classes.controlIcon} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
