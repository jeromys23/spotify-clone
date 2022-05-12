//React
import React from "react";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

const styles = makeStyles({
  image: {
    width: 190,
    height: 190,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#131313",
    paddingTop: "20px",
    paddingBottom: "20px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(50,50,50, 0.3)",
      cursor: "pointer",
    },
  },
  title: {
    textAlign: "left",
    marginTop: '20px',
    marginBottom: '5px',
    width: "190px",
    color: "#fff",
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  year: {
    textAlign: 'left',
    width: "190px",
    color: '#CCC'
  },
  link: {
    textDecoration: 'none'
  }
});

export default function Album(props) {

  const classes = styles();

  return (
    <Link to={`/album/${props.album.id}`} className={classes.link}>
      <Paper elevation={3} className={classes.paper}>
        <img
          src={props.album.images[1].url}
          alt="album cover"
          className={classes.image}
          loading={"lazy"}
        />
        <Box className={classes.title}>
          {props.album.name}
        </Box>
        <Box className={classes.year}>
          {new Date(props.album.release_date).toLocaleDateString('en-US', {year: 'numeric'})}
        </Box>
      </Paper>
    </Link>
  );
}
