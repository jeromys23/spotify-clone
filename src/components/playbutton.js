import React from 'react'

import {PlayCircle} from "@mui/icons-material";
import Box from "@mui/material/Box"

import { useDispatch, useSelector } from 'react-redux';
import { setURI, setPlaying } from '../redux/spotifySlice';

export default function Playbutton({uri}) {

  const dispatch = useDispatch();

  const isPlaying = useSelector((state) => state.spotify.isPlaying)


  const handlePlayClick = () => {
    uri && dispatch(setURI(uri));
    !isPlaying && dispatch(setPlaying(true));
  }

  return ( 
    <Box onClick={handlePlayClick} sx={{background: 'var(--black)', display: 'inline-block'}}>
      <PlayCircle sx={{color: 'var(--green)', transform: 'scale(2.75)'}}/>
    </Box>
  )
}
