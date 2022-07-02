import React, { lazy, useState } from 'react';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

//Icons
import PlayArrow from '@mui/icons-material/PlayArrow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

//Components
import { Link } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, setShouldPlay, setURI } from '../redux/spotifySlice';

//GraphQL
import { useLazyQuery } from '@apollo/client';
import { GetTrackData } from '../graphql/trackQuery';

//styles
const styles = makeStyles({
    songArtistContainer: {
        display: 'flex',
    },
    tableText: {
        color: '#CCC',
        borderCollapse: 'collapse',
        fontFamily: 'Raleway',
    },
    tableHeader: {
        fontWeight: 'normal !important',
        textAlign: 'left',
        marginBottom: '10px',
    },
    trackTable: {
        fontSize: '14px',
    },
    trackImage: {
        height: '45px',
        width: '45px',
        marginRight: '15px',
    },
    trackText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    tableHeaderText: {
        fontWeight: 'normal',
        paddingBottom: '10px',
        paddingLeft: '7px',
    },
    rowDivider: {
        borderTop: '1px solid rgba(100,100,100,0.5)',
        height: '5px',
    },
    trackRow: {
        '&:hover': {
            background: 'rgba(100,100,100,0.5)',
        },
    },
    tableCell: {
        height: '50px',
        padding: '7px 0 7px 7.5px',
    },
    artistAlbumLink: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    rowName: {
        fontSize: '16px',
        paddingBottom: '2px',
    },
});

/**
 * Tracklist for liked songs, playlists, albums, artists
 * @param {*} props
 * @returns
 */
export default function Tracklist(props) {
    const classes = styles();
    const [hoverRow, setHoverRow] = useState(-1);
    const [playingRow, setPlayingRow] = useState(-1);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const dispatch = useDispatch();
    const globalURI = useSelector((state) => state.spotify.URI);
    const currentSong = useSelector((state) => state.spotify.currentSong);

    //GraphQL query
    const [getSongData, { loading, error, data }] = useLazyQuery(GetTrackData, {
        onCompleted: (data) => {
            if (data.TrackData && data.TrackData.uri !== globalURI) {
                dispatch(setURI(data.TrackData.uri));
                // dispatch(setCurrentSong(data.TrackData));
            }
        },
        fetchPolicy: 'network-only',
    });

    const handlePlay = (event, uri) => {
        //Check if we are clicking anchor tag to artist or album
        if (event.target.nodeName === 'A') {
            event.stopPropgation();
        } else {
            dispatch(setShouldPlay(true));
            dispatch(setURI(uri));
        }
    };

    return (
        <Box className={classes.trackTable}>
            <table style={{ width: '100%' }} className={classes.tableText}>
                <tbody>
                    <tr className={classes.tableHeader}>
                        <th
                            style={{ width: '7%', paddingLeft: '10px' }}
                            className={classes.tableHeaderText}
                        >
                            #
                        </th>
                        <th
                            style={{ width: props.isAlbum ? '70%' : '40%' }}
                            className={classes.tableHeaderText}
                        >
                            TITLE
                        </th>
                        {!props.isAlbum && matches && (
                            <th
                                style={{ width: '30%' }}
                                className={classes.tableHeaderText}
                            >
                                ALBUM
                            </th>
                        )}
                        {matches && (
                            <th
                                style={{ width: '12%' }}
                                className={classes.tableHeaderText}
                            >
                                <AccessTimeIcon />
                            </th>
                        )}
                    </tr>
                    <tr>
                        <td className={classes.rowDivider} colSpan={5}></td>
                    </tr>
                    {props.tracks.map(
                        (row, i) =>
                            row && (
                                <tr
                                    key={i}
                                    className={classes.trackRow}
                                    style={{
                                        color:
                                            row.id == currentSong.id
                                                ? 'var(--green)'
                                                : '',
                                    }}
                                    onClick={(event) =>
                                        handlePlay(event, row.uri)
                                    }
                                    onMouseEnter={() => setHoverRow(i)}
                                    onMouseLeave={() => setHoverRow(-1)}
                                >
                                    <td
                                        className={classes.tableCell}
                                        style={{
                                            borderRadius: '5px 0 0 5px',
                                            paddingLeft: '10px',
                                        }}
                                    >
                                        <Box width={'25px'}>
                                            {i == hoverRow &&
                                            i != playingRow ? (
                                                <PlayArrow />
                                            ) : (
                                                i + 1
                                            )}
                                        </Box>
                                    </td>
                                    <td
                                        className={classes.tableCell}
                                        style={{
                                            borderRadius: matches
                                                ? ''
                                                : '0 5px 5px 0',
                                        }}
                                    >
                                        <Box
                                            className={
                                                classes.songArtistContainer
                                            }
                                        >
                                            {!props.isAlbum && (
                                                <Box
                                                    className={
                                                        classes.trackImage
                                                    }
                                                >
                                                    <img
                                                        className={
                                                            classes.trackImage
                                                        }
                                                        src={
                                                            row.album.images[
                                                                row.album.images
                                                                    .length - 1
                                                            ].url
                                                        }
                                                        alt={row.name}
                                                        loading={lazy}
                                                    />
                                                </Box>
                                            )}
                                            <Box className={classes.trackText}>
                                                <Box
                                                    className={classes.rowName}
                                                    style={{
                                                        color:
                                                            row.id ==
                                                            currentSong.id
                                                                ? 'var(--green)'
                                                                : '#fff',
                                                    }}
                                                >
                                                    {row.name}
                                                </Box>
                                                {!props.isAlbum && (
                                                    <Box paddingTop={'2px'}>
                                                        {row.artists.map(
                                                            (
                                                                artist,
                                                                index,
                                                                artists
                                                            ) => (
                                                                <React.Fragment
                                                                    key={index}
                                                                >
                                                                    {matches && (
                                                                        <Link
                                                                            className={
                                                                                classes.artistAlbumLink
                                                                            }
                                                                            to={`/artist/${artist.id}`}
                                                                        >
                                                                            {
                                                                                artist.name
                                                                            }
                                                                        </Link>
                                                                    )}
                                                                    {!matches && (
                                                                        <Box
                                                                            display={
                                                                                'inline'
                                                                            }
                                                                            className={
                                                                                classes.artistAlbumLink
                                                                            }
                                                                        >
                                                                            {
                                                                                artist.name
                                                                            }
                                                                        </Box>
                                                                    )}
                                                                    {index ===
                                                                    artists.length -
                                                                        1
                                                                        ? ''
                                                                        : ', '}
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </td>
                                    {!props.isAlbum && matches && (
                                        <td className={classes.tableCell}>
                                            <Link
                                                className={
                                                    classes.artistAlbumLink
                                                }
                                                to={`/album/${row.album.id}`}
                                            >
                                                {row.album.name}
                                            </Link>
                                        </td>
                                    )}

                                    {matches && (
                                        <td
                                            className={classes.tableCell}
                                            style={{
                                                borderRadius: '0 5px 5px 0',
                                            }}
                                        >
                                            {Math.floor(
                                                row.duration_ms / 60000
                                            )}
                                            :
                                            {Math.floor(
                                                (row.duration_ms % 60000) / 1000
                                            )
                                                .toString()
                                                .padStart(2, '0')}
                                        </td>
                                    )}
                                </tr>
                            )
                    )}
                </tbody>
            </table>
        </Box>
    );
}
