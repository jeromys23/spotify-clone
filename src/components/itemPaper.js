//React
import React, { useState } from 'react';

//components
import PlayButton from './playbutton';

//Styles
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';

const styles = makeStyles({
    image: {
        width: 190,
        height: 190,
    },
    paper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#131313',
        paddingTop: '20px',
        width: '250px',
        paddingBottom: '20px',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(50,50,50, 0.3)',
            cursor: 'pointer',
        },
    },
    title: {
        textAlign: 'left',
        marginTop: '20px',
        marginBottom: '5px',
        width: '190px',
        color: '#fff',
    },
    link: {
        textDecoration: 'none',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    metadata: {
        textAlign: 'left',
        width: '190px',
        color: '#CCC',
    },
    playButton: {
        position: 'absolute',
        right: '47.5px',
        top: '57.5%',
    },
});

/**
 * Tile for showing artist album
 * @param {} param0
 * @returns
 */
export default function ItemPaper({ image, title, metadata, url, uri }) {
    const [showPlayBtn, setShowPlayBtn] = useState(false);
    const classes = styles();

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
            }}
            onMouseEnter={() => setShowPlayBtn(true)}
            onMouseLeave={() => setShowPlayBtn(false)}
        >
            {showPlayBtn && (
                <Box className={classes.playButton}>
                    <PlayButton uri={uri} />
                </Box>
            )}

            <Link to={url} className={classes.link}>
                <Paper elevation={3} className={classes.paper}>
                    <img
                        src={image}
                        alt={title}
                        className={classes.image}
                        loading={'lazy'}
                    />

                    <Box className={classes.title}>{title}</Box>

                    {metadata && (
                        <Box className={classes.metadata}>{metadata}</Box>
                    )}
                </Paper>
            </Link>
        </Box>
    );
}
