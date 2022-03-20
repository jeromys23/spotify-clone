import React from 'react'

import {PlayCircle} from "@mui/icons-material";
import Box from "@mui/material/Box"

export default function Playbutton({tracks}) {

  const uris = tracks.map(item => (
    item.track.uri
  ));

  const handlePlayClick = () => {

  };

  console.log("uris: ", uris);


  return (
    <Box sx={{height: '100px', marginLeft: '20px', marginTop: '20px'}}>
      <Box onClick={handlePlayClick}>
        <PlayCircle sx={{color: 'var(--green)', transform: 'scale(2.75)'}}/>
      </Box>
    </Box>
  )
}
