//React
import React, { useEffect, useRef } from "react";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

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
    width: "230px",
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
    width: "190px",
    color: "gray",
  },
});

export default function Album(album) {
  let spotifyPlayer = useRef(null);

  const classes = styles();

  return (
    <Paper elevation={3} className={classes.paper}>
      <img
        src={album.data.images[1].url}
        alt="album cover"
        className={classes.image}
        loading={"lazy"}
      />
      <div className={classes.title}>
        <p>{album.data.name}</p>
      </div>
    </Paper>
  );
}
