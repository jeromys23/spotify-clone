import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import spotifyReducer from "./spotifySlice";

export default configureStore({
  reducer: {
    user: userReducer,
    spotify: spotifyReducer,
  },
});
