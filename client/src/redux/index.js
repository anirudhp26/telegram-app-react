import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    token: null,
    user: null,
    teleuser: null,
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
            state.teleuser = null;
        },

        setUser: (state, action) => {
            state.user = action.payload.user;
        },

        setTeleUser: (state, action) => {
            state.teleuser = action.payload.teleuser;
        }
    }
});

export const { setLogin, setUser, setTeleUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
