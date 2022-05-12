import React from 'react'

import {PlayCircle} from "@mui/icons-material";
import Box from "@mui/material/Box"

import { useDispatch } from 'react-redux';
import { setURI } from '../redux/spotifySlice';

export default function Playbutton({tracks, uri}) {

  const dispatch = useDispatch();

  const uris = tracks
    .map(item => (item.uri)
  );

  const handlePlayClick = () => {
    uri && dispatch(setURI(uri));
  }

  return (
    <Box sx={{height: '100px', marginLeft: '20px', marginTop: '20px'}}>
      <Box onClick={handlePlayClick}>
        <PlayCircle sx={{color: 'var(--green)', transform: 'scale(2.75)'}}/>
      </Box>
    </Box>
  )
}
