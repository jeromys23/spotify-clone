import React from 'react'


//MUI
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box"


//styles
const styles = makeStyles({
    header: {
      fontSize: "90px",
      fontWeight: "bold",
      position: "relative",
      paddingBottom: "20px",
    },
    playlistImage: {
      height: "250px",
      width: "250px",
      boxShadow: "0 0 25px #101010",
    },
    topHeader: {
      display: "flex",
      paddingTop: "80px",
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
  });

export default function GeneralPageLayout(props) {

    const classes = styles();

    return (
      <Box
          className={classes.topHeader}
          px={"30px"}
          paddingBottom={"30px"}>
          {props.data.image &&  <Box className={classes.playlistImage}>
          <img
              src={props.data.image}
              alt={props.data.name}
              height={"250px"}
              width={"250px"}
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
