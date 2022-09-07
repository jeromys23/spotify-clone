import React, { useEffect, useState } from 'react';

//MUI
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

//FAC
import FastAverageColor from 'fast-average-color';

//styles
const styles = makeStyles((theme) => ({
    content: {
        width: 'calc(100vw - 225px)',
        position: 'absolute',
        right: 0,
        top: 0,
        overflowY: 'auto',
        marginLeft: 200,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: '100vw',
            marginLeft: 0,
        },
    },
}));

/**
 * Container to hold all dashboard content
 * @param {} props
 * @returns
 */
export default function ContentContainer(props) {
    const [bg, setBg] = useState();
    const [height, setHeight] = useState(
        'calc(var(--app-height) - var(--player-height))'
    );
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const fac = new FastAverageColor();

    useEffect(() => {
        props.image &&
            fac.getColorAsync(props.image).then((color) => {
                let colorString = `linear-gradient(0deg, rgba(25, 20, 20, 1) 0%, ${color.rgba} 100%)`;
                setBg(colorString);
            });

        props.colorString && setBg(props.colorString);
    }, []);

    useEffect(() => {
        setHeight('calc(var(--app-height) - var(--player-height))');
        if (matches) {
            setHeight('calc(var(--app-height) - var(--player-height-mobile))');
        }
    }, [matches]);

    const classes = styles();
    return (
        <Box className={classes.content} height={height}>
            <Box
                sx={{
                    background: bg,
                    zIndex: '-999',
                    height: '100%',
                    width: '100%',
                    right: 0,
                    top: 0,
                    position: 'absolute',
                }}
            ></Box>
            {props.children}
        </Box>
    );
}
