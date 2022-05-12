//axios
import React, { useEffect } from "react";

//spotify
import {
  loginUrl,
  redirect_uri,
  TOKEN_URL,
  client_id,
  client_secret,
} from "../spotify";

//querystring
import querystring from "query-string";
import {Buffer} from 'buffer';

//styles
import { makeStyles } from "@material-ui/core/styles";

//axios
import axios from "axios";

//redux
import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";


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


  useEffect(() => {
    //Try to get user info from url
    let code = new URLSearchParams(window.location.search).get("code");

    //If there is user information, call spotify to exchange code for token
    if (code) {
      //auth params
      var authOptions = {
        body: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        json: true,
      };

      axios
        .post(TOKEN_URL, querystring.stringify(authOptions.body), {
          headers: authOptions.headers,
        })
        .then((res) => {
          dispatch(login(res.data));
        });

      // Get rid of code from url
      window.history.pushState({}, null, "/");
    }
  }, []);

  return (
    <div className={classes.loginContainer}>
      <div className={classes.header}>
        Spotify Clone
      </div>
      <div>
        <a href={loginUrl}>
          <div className={classes.btnLogin}>
            <div>Login</div>
          </div>
        </a>
      </div>



    </div>
  );
}
