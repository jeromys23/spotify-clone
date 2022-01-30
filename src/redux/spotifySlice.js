import { createSlice } from "@reduxjs/toolkit";

export const spotifySlice = createSlice({
  name: "spotify",
  initialState: {
    currentTrackUri: "",
    deviceId: "",
  },
  reducers: {
    setDeviceId: (state, action) => {
      state.deviceId = action.device_id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDeviceId } = spotifySlice.actions;

export default spotifySlice.reducer;
