import { createSlice } from "@reduxjs/toolkit";

export const spotifySlice = createSlice({
  name: "spotify",
  initialState: {
    RecentlyPlayed: null,
    CurrentlyPlaying: null,
    PlayerInfo: null,
    DeviceId: null,
    URI: null
  },
  reducers: {
    setDeviceId: (state, action) => {
      state.DeviceId = action.payload;
    },
    setURI: (state, action) => {
      state.URI = action.payload;
    },
    setCurrentlyPlaying: (state, action) => {
      state.CurrentlyPlaying = action.payload
    },
    setRecentlyPlayed: (state, action) => {
      state.RecentlyPlayed = action.payload
    },
    setPlayerInfo: (state, action) => {
      state.PlayerInfo = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setDeviceId, setURI, setRecentlyPlayed} = spotifySlice.actions;

export default spotifySlice.reducer;
