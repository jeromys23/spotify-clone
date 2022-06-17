//axios
import React, { useEffect } from "react";


//spotify helpers
import {GetAccessToken, LOGIN_URL} from '../util/spotifyHelper'

//styles
import { makeStyles } from "@material-ui/core/styles";

//redux
import { login } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";


const styles = makeStyles({
  loginContainer: {
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'

  },
  btnLogin: {
    background: 'var(--green)',
    width: '175px',
    height: '40px',
    borderRadius: '20px',
    color: 'var(--black)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: '50px',
    fontSize: '30px',
    fontWeight: 'bold'
  }

});

export default function Login() {
  const dispatch = useDispatch();
  const classes = styles();

  //Try to get token from redux
  const access_token = useSelector((state) => state.user.access_token);

  useEffect(() => {

    //If not in redux, we are not logged in
    if(!access_token) {
    
      //Try to get user info from url
      let code = new URLSearchParams(window.location.search).get("code");

      //If there is user information, call spotify to exchange code for token
      if (code) {

        GetAccessToken(code).then(res => dispatch(login(res)));

        // Get rid of code from url
        window.history.pushState({}, null, "/");
      }
    }
  }, [access_token]);

  return (
    <div className={classes.loginContainer}>
      <div className={classes.header}>
        Spotify Clone
      </div>
      <div>
        <a href={LOGIN_URL}>
          <div className={classes.btnLogin}>
            <div>Login</div>
          </div>
        </a>
      </div>
    </div>
  );
}
