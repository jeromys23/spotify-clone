import React, { useEffect, useState } from 'react';

//MUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

//styles
const styles = makeStyles((theme) => ({
    header: {
        fontSize: '90px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '8vw',
        },
        fontWeight: 'bold',
        position: 'relative',
        padding: '10px 0',
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    playlistImage: {
        boxShadow: '0 0 25px #101010',
    },
    topHeader: {
        alignItems: 'center',
        display: 'flex',
        gap: '20px',
        padding: '80px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: '50px 30px',
        },
    },
    metadata: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
    },
    type: {
        textTransform: 'uppercase',
        color: '#CCC',
        fontWeight: 'bold',
        fontSize: '14px',
    },
    metaContainer: {
        minWidth: 0,
        display: 'flex',
        width: '100%',
        position: 'relative',
        alignItems: 'center',
    },
}));

/**
 * Layout for playable pages. Top box with title, image, bottom with tracklist
 * @param {} props
 * @returns
 */
export default function GeneralPageLayout(props) {
    const classes = styles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const [size, setSize] = useState('250px');

    useEffect(() => {
        setSize(matches ? '100px' : '250px');
    }, [matches]);

    return (
        <Box className={classes.topHeader}>
            {props.data.image && (
                <Box
                    className={classes.playlistImage}
                    height={size}
                    width={size}
                >
                    <img
                        src={props.data.image}
                        alt={props.data.name}
                        height={size}
                        width={size}
                    />
                </Box>
            )}
            <Box className={classes.metaContainer}>
                <Box className={classes.metadata}>
                    <Box className={classes.type}>{props.type}</Box>
                    <Box className={classes.header}>{props.data.name}</Box>
                    <Box>{props.children}</Box>
                </Box>
            </Box>
        </Box>
    );
}
