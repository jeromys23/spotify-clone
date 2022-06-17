import { createSlice } from "@reduxjs/toolkit";

export const spotifySlice = createSlice({
  name: "spotify",
  initialState: {
    Updated: null,
    URI: null,
    isPlaying: false
  },
  reducers: {
    setURI: (state, action) => {
      state.URI = action.payload;
    },
    setUpdated: (state, action) => {
      state.Updated = action.payload
    },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setURI, setUpdated, setPlaying } = spotifySlice.actions;

export default spotifySlice.reducer;
