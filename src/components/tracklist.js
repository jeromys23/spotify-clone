import React, { lazy, useEffect, useState } from 'react'

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { PlayArrow } from '@mui/icons-material';


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
  },
  trackText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft:'15px'
  },
  tableHeaderText: {
    fontWeight: 'normal',
    paddingBottom: '10px'    
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
    padding: '7px 0 7px 7.5px'
  }
});


export default function Tracklist({props}) {  

  const classes = styles();

  const [activeRow, setActiveRow] = useState(-1);

  
  return (
    <Box className={classes.trackTable}>
      <table style={{width: '100%'}} className={classes.tableText}>
        
        <tbody>
          <tr className={classes.tableHeader}>
            <th style={{width: '4%', paddingLeft: '10px'}} className={classes.tableHeaderText}>#</th>
            <th style={{width: '40%'}} className={classes.tableHeaderText}>TITLE</th>
            <th style={{width: '30%'}} className={classes.tableHeaderText}>ALBUM</th>
            <th style={{width: '12%'}} className={classes.tableHeaderText}>DATE ADDED</th>
            <th style={{width: '12%'}} className={classes.tableHeaderText}>LENGTH</th>
          </tr>
          <tr>
            <td className={classes.rowDivider} colSpan={5}></td>
          </tr>
          {props.map((row, i) => 
          row.track &&
          <tr key={i} className={classes.trackRow} onMouseEnter={() => setActiveRow(i)} onMouseLeave={() => setActiveRow(-1)}>
            <td className={classes.tableCell} style={{borderRadius: '5px 0 0 5px', paddingLeft: '10px'}}>{i == activeRow ? <PlayArrow/> : i + 1}</td>
            <td className={classes.tableCell}>
              <Box className={classes.songArtistContainer} >
                <Box className={classes.trackImage}>
                  <img className={classes.trackImage} src={row.track.album.images[row.track.album.images.length - 1].url} alt={row.track.name} loading={lazy}/>
                </Box>
                <Box className={classes.trackText}>
                  <Box fontSize={'17px'} color={'#fff'} paddingBottom={'2px'}> {row.track.name}</Box>
                  <Box paddingTop={'2px'}>{row.track.artists[0].name}</Box>
                </Box>             
              </Box>
            </td>
            <td className={classes.tableCell}>
              {row.track.album.name}
            </td>
            <td className={classes.tableCell}>
              {new Date(row.added_at).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
            </td>
            <td className={classes.tableCell} style={{borderRadius: '0 5px 5px 0'}}>
              {Math.floor(row.track.duration_ms / 60000)}:{Math.floor((row.track.duration_ms % 60000) / 1000).toString().padStart(2, '0')}
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </Box>
  )
}
