//React
import React, { useEffect, useState } from "react";

//Axios
import axios from "axios";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";

//Redux
import { useSelector } from "react-redux";

//Styles
const styles = makeStyles({
  navbar: {
    position: "fixed",
    width: "207.5px",
    left: "0",
    top: "0",
    height: "100vh",
    backgroundColor: "#121212",
    padding: "15px",
    fontWeight: "bold",
  },
  navlinkContainer: {
    position: "relative",
    color: "darkgrey",
  },
  navlink: {
    position: "absolute",
    top: "6px",
    left: "15px",
    width: "100px",
  },
  navContent: {
    fontSize: "14px",
    display: "flex",
    paddingBottom: "20px",
  },
  greyDivider: {
    height: "1px",
    backgroundColor: "#303030",
    width: "100%",
  },
  icon: {
    color: "darkgrey",
  },
});

export default function Navbar() {
  const access_token = useSelector((state) => state.user.access_token);
  //Styles
  const classes = styles();

  //States
  const [playlists, setPlaylists] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:3001/playlists", { access_token })
      .then((res) => {
        setPlaylists(res.data.items);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div className={classes.navbar}>
      <div className={classes.navContent}>
        <HomeRoundedIcon sx={{ fontSize: 27 }} className={classes.icon} />
        <div className={classes.navlinkContainer}>
          <div className={classes.navlink}>Home</div>
        </div>
      </div>
      <div className={classes.navContent}>
        <SearchIcon sx={{ fontSize: 27 }} className={classes.icon} />
        <div className={classes.navlinkContainer}>
          <div className={classes.navlink}>Search</div>
        </div>
      </div>
      <div className={classes.navContent}>
        <MenuBookIcon sx={{ fontSize: 27 }} className={classes.icon} />
        <div className={classes.navlinkContainer}>
          <div className={classes.navlink}>Your Library</div>
        </div>
      </div>
      <div className={classes.navContent}>
        <AddBoxSharpIcon sx={{ fontSize: 27 }} className={classes.icon} />
        <div className={classes.navlinkContainer}>
          <div className={classes.navlink}>Add Playlist</div>
        </div>
      </div>
      <div className={classes.navContent}>
        <FavoriteSharpIcon sx={{ fontSize: 27 }} className={classes.icon} />
        <div className={classes.navlinkContainer}>
          <div className={classes.navlink}>Liked Songs</div>
        </div>
      </div>
      <div className={classes.greyDivider}></div>
    </div>
  );
}
