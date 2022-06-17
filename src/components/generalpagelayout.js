import React, { useEffect, useState } from 'react'

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box"

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


//styles
const styles = makeStyles((theme) => ({
    header: {
      fontSize: "90px",
      [theme.breakpoints.down('sm')] : {
        fontSize: '40px'
      },
      fontWeight: "bold",
      position: "relative",
      paddingBottom: "20px",
    },
    playlistImage: {
      boxShadow: "0 0 25px #101010",
    },
    topHeader: {
      display: "flex",
      paddingTop: "80px",
      [theme.breakpoints.down('xs')] : {
        paddingBottom: '80px'
      },
    },
    metadata: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "30px",
    },
    type: {
      textTransform: 'uppercase',
      color: '#CCC',
      fontWeight: 'bold',
      fontSize: '14px'
    }
  }));

export default function GeneralPageLayout(props) {

    const classes = styles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const [size, setSize] = useState('250px');

    useEffect(() => {
      setSize(matches ? '100px' : '250px');
    }, [matches])


    return (
      <Box
          className={classes.topHeader}
          px={"30px"}
          paddingBottom={"30px"}>
          {props.data.image && <Box className={classes.playlistImage} height={size} width={size}>
          <img
              src={props.data.image}
              alt={props.data.name}
              height={size}
              width={size}
          />
          </Box>}
          <Box position={"relative"} width={"100%"}>
              <Box className={classes.metadata}>
                <Box className={classes.type}>{props.type}</Box>
                <Box className={classes.header}>{props.data.name}</Box>
                <Box>{props.children}</Box>
              </Box>
          </Box>
      </Box>
    )
}
