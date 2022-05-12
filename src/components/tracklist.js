import React, { lazy, useEffect, useState } from 'react'

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { PlayArrow } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { setURI } from '../redux/spotifySlice';



//styles
const styles = makeStyles({
  songArtistContainer: {
    display: 'flex',    
  },
  tableText: {
    color: "#CCC",
    borderCollapse: 'collapse'
  },
  tableHeader:{
    fontWeight: 'normal !important',
    textAlign: 'left',
    marginBottom: '10px'
  },
  trackTable: {
    fontSize: '14px'
  },
  trackImage: {
    height: '45px',
    width: '45px',
    marginRight: '15px'
  },
  trackText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tableHeaderText: {
    fontWeight: 'normal',
    paddingBottom: '10px',
    paddingLeft: '7px'    
  },
  rowDivider: {
    borderTop: '1px solid rgba(100,100,100,0.5)',
    height: '5px',
  },
  trackRow: {
    '&:hover': {
      background: 'rgba(100,100,100,0.5)'
    }
  },
  tableCell: {
    height: '50px',
    padding: '7px 0 7px 7.5px'
  },
  artistAlbumLink: {
    textDecoration: 'none',
    color: 'inherit',
    "&:hover": {
      textDecoration: "underline", 
    }
  }
});


export default function Tracklist(props) {  

  const classes = styles();
  const [activeRow, setActiveRow] = useState(-1);

  const dispatch = useDispatch();

  const handlePlay = (uri) => {
    dispatch(setURI(uri))
  }


  
  return (
    <Box className={classes.trackTable}>
      <table style={{width: '100%'}} className={classes.tableText}>
        
        <tbody>
          <tr className={classes.tableHeader}>
            <th style={{width: '4%', paddingLeft: '10px'}} className={classes.tableHeaderText}>#</th>
            <th style={{width: props.isAlbum ? '70%' : '40%'}} className={classes.tableHeaderText}>TITLE</th>
            {!props.isAlbum && <th style={{width: '30%'}} className={classes.tableHeaderText}>ALBUM</th>}
            {props.showDateAdded && <th style={{width: '12%'}} className={classes.tableHeaderText}>DATE ADDED</th>}
            <th style={{width: '12%'}} className={classes.tableHeaderText}><AccessTimeIcon/></th>
          </tr>
          <tr>
            <td className={classes.rowDivider} colSpan={5}></td>
          </tr>
          {props.tracks.map((row, i) => 
            row &&
            <tr key={i} className={classes.trackRow} onMouseEnter={() => setActiveRow(i)} onMouseLeave={() => setActiveRow(-1)}>
              <td className={classes.tableCell} style={{borderRadius: '5px 0 0 5px', paddingLeft: '10px'}}>
                <div onClick={() => handlePlay(row.uri)}>
                  {i == activeRow ? 
                    <PlayArrow/>
                    : 
                    i + 1}
                </div>
              </td>
              <td className={classes.tableCell}>
                <Box className={classes.songArtistContainer} >
                  {!props.isAlbum &&
                  <Box className={classes.trackImage}>
                     <img className={classes.trackImage} src={row.album.images[row.album.images.length - 1].url} alt={row.name} loading={lazy}/>
                  </Box>}
                  <Box className={classes.trackText}>
                    <Box fontSize={'17px'} color={'#fff'} paddingBottom={'2px'}> {row.name}</Box>
                    {!props.isAlbum && 
                    <Box paddingTop={'2px'}>
                      {row.artists.map((artist, index, artists) =>
                        <React.Fragment key={index}>
                          <Link className={classes.artistAlbumLink} to={`/artist/${artist.id}`}>{artist.name}</Link> 
                          {index === artists.length - 1 ? "" : ", "}
                        </React.Fragment>
                      )}
                    </Box>}
                  </Box>             
                </Box>
              </td>
              {!props.isAlbum &&
              <td className={classes.tableCell}>
                 <Link className={classes.artistAlbumLink} to={`/album/${row.album.id}`}>{row.album.name}</Link>
              </td>}

              {props.showDateAdded &&
              <td className={classes.tableCell}>
                {new Date(props.showDateAdded).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
              </td>}

              <td className={classes.tableCell} style={{borderRadius: '0 5px 5px 0'}}>
                {Math.floor(row.duration_ms / 60000)}:{Math.floor((row.duration_ms % 60000) / 1000).toString().padStart(2, '0')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Box>
  )
}
