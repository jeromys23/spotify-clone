import React from 'react'

//MUI
import Box from "@material-ui/core/Box";

//Styles
import { makeStyles } from "@material-ui/core/styles";

//styles
const styles = makeStyles({
    content: {
      width: "calc(100vw - 225px)",
      position: "absolute",
      right: 0,
      top: 0,
      height: "calc(100vh - 90px)",
      overflowY: "auto",
      marginLeft: 200,
      display: 'flex',
      flexDirection: 'column'
    },
  });


export default function ContentContainer(props) {

    const classes = styles();
    return (
        <Box className={classes.content}>    
            <Box
            sx={{
            background: props.bg,
            zIndex: "-999",
            height: '100%',
            width: '100%',
            right: 0,
            top: 0,
            position: 'absolute'
            }}></Box>  
            {props.children} 
        </Box> 
    )
}
