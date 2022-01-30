//React
import React, { useEffect } from "react";
//Redux
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";
//Axios
import axios from "axios";

export default function useAuth(code) {
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("running");
    axios
      .post("http://localhost:3001/login", { code })
      .then((res) => {
        // Successful request, set token data
        dispatch(setToken(res.data));

        // Get rid of code from url
        window.history.pushState({}, null, "/");
      })
      .catch((e) => {
        // Bad request, code most likely expired, redirect user
        window.location = "/";
      });
  }, []);
}
