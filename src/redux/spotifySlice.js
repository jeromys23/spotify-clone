import { createSlice } from '@reduxjs/toolkit';

/**
 * Redux store for spotify items
 * URI is the globally set current URI
 * deviceId is this player's device ID
 * shouldPlay describes the state of the player (if it should be playing)
 * currentSong contains current songs album image, artists, name to show for the player
 */
export const spotifySlice = createSlice({
    name: 'spotify',
    initialState: {
        URI: null,
        deviceId: null,
        shouldPlay: false,
        currentSong: null,
    },
    reducers: {
        setURI: (state, action) => {
            state.URI = action.payload;
        },
        setDeviceId: (state, action) => {
            state.deviceId = action.payload;
        },
        setShouldPlay: (state, action) => {
            state.shouldPlay = action.payload;
        },
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setDeviceId, setShouldPlay, setCurrentSong, setURI } =
    spotifySlice.actions;

export default spotifySlice.reducer;
