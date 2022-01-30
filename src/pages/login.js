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

//axios
import axios from "axios";

//redux
import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();

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
    <div>
      <a href={loginUrl}>Login</a>
    </div>
  );
}
