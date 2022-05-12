//React
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    height: "Calc(100vh - 105px)",
    backgroundColor: "#121212",
    padding: '15px 0 0 15px',
    fontWeight: "bold",
    fontSize: "14px",
    color: "darkgrey",
    display: 'flex',
    flexDirection: 'column'
  },
  navlinkContainer: {
    position: "relative",
    minHeight: '30px'    
  },
  navlink: {
    position: "absolute",
    top: "6px",
    left: "15px",
    width: "100px",
  },
  navContent: {
    display: "flex",
    paddingBottom: "20px",
  },
  playlistContainer: {
    paddingLeft: '10px',
    height: '20px',
    paddingTop: '20px'
  },
  greyDivider: {
    height: "1px",
    backgroundColor: "#303030",
    width: "100%",
  },
  icon: {
    color: "darkgrey",
  },
  playlistLink: {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    "&:hover": {
      color: "rgb(250, 250, 250)"
    }
  }
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
      .get("https://api.spotify.com/v1/me/playlists", { headers: {"Authorization" : `Bearer ${access_token}`}})
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
      <div>
        <div className={classes.navContent}>
          <HomeRoundedIcon sx={{ fontSize: 27 }} className={classes.icon} />
          <div className={classes.navlinkContainer}>
            <Link to={'/'} className={classes.playlistLink}><div className={classes.navlink}>Home</div></Link>
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
      <div className={"bottomNav"}>
        {!loading && playlists.map((playlist, i) => 
        <div className={classes.playlistContainer} key={i}>
            <Link to={`/playlist/${playlist.id}`} className={classes.playlistLink}><div>{playlist.name}</div></Link>
        </div>
        )}
      </div>      
    </div>
  );
}
