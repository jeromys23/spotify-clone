//React
import React, { useEffect, useState } from "react";

//Redux
import { useSelector } from "react-redux";

//Axios
import axios from "axios";

//Pages / Components
import Album from "../components/album";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

//Spotify
import { BROWSE_URL } from "../spotify";

const styles = makeStyles({
  content: {
    width: "calc(100vw - 240px)",
    position: "absolute",
    right: 0,
    top: 0,
    height: "calc(100vh - 90px)",
    overflowY: "scroll",
    marginLeft: 200,
    background:
      "linear-gradient(0deg, rgba(18,18,18,1) 45%, rgba(81,46,95,1) 100%)",
  },
  albumItem: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  },
  header: {
    fontSize: "100px",
    paddingLeft: "10px",
    height: "150px",
    paddingTop: "80px",
    position: "relative",
    fontWeight: "bold",
  },
  backgroundHome: {},
});

export default function Home() {
  const access_token = useSelector((state) => state.user.access_token);

  const classes = styles();

  const [albums, setAlbums] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {}, []);

  const albumComponents =
    albums &&
    albums.map((album, index) => (
      <Grid
        key={index}
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className={classes.albumItem}
      >
        <Album key={index} data={album}></Album>
      </Grid>
    ));

  return (
    <div className={classes.backgroundHome}>
      <div className={classes.content}>
        <div className={classes.header}>Browse</div>

        <Grid container justifyContent="center" spacing={0}>
          {isLoading ? "Loading" : albumComponents}
        </Grid>
      </div>
    </div>
  );
}
