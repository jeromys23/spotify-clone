import { createSlice } from '@reduxjs/toolkit';

/**
 * Redux store for the user context
 */
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        access_token: null,
        refresh_token: null,
        expires_in: null,
    },
    reducers: {
        setUserAuth: (state, action) => {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.expires_in = action.payload.expires_in;
            localStorage.setItem('token', action.payload.access_token);
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUserAuth } = userSlice.actions;

export default userSlice.reducer;
