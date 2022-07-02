import React from 'react';

import { PlayCircle } from '@mui/icons-material';
import Box from '@mui/material/Box';

import { useDispatch } from 'react-redux';
import { setShouldPlay, setURI } from '../redux/spotifySlice';

/**
 * Button used to play playlist, album, and artist uri's
 * @param {} param0
 * @returns
 */
export default function Playbutton({ uri }) {
    const dispatch = useDispatch();

    const handlePlayClick = () => {
        dispatch(setURI(uri));
        dispatch(setShouldPlay(true));
    };

    return (
        <Box
            onClick={() => handlePlayClick()}
            sx={{ background: 'var(--black)', display: 'inline-block' }}
        >
            <PlayCircle
                sx={{ color: 'var(--green)', transform: 'scale(2.75)' }}
            />
        </Box>
    );
}
