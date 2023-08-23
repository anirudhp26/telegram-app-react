import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    token: null,
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    defaultState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },

        setUser: (state, action) => {
            state.user = action.payload.user;
        }
    }
});

export const { setLogin, setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
