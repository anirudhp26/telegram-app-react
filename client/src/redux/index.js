import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
    token: null,
    user: null,
    teleuser: null,
    sessionString: null,
    channelInfo: null,
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
            state.sessionString = null;
            state.channelInfo = null;
        },

        setUser: (state, action) => {
            state.user = action.payload.user;
        },

        setTeleUser: (state, action) => {
            state.teleuser = action.payload.teleuser;
            state.sessionString = action.payload.sessionString;
        },

        setTeleUserLogout: (state) => {
            state.teleuser = null;
            state.sessionString = null;
        },

        setChannelInfo: (state, action) => {
            state.channelInfo = action.payload.channelInfo;
        }
    }
});

export const { setLogin, setUser, setTeleUser, setLogout, setChannelInfo, setTeleUserLogout } = authSlice.actions;

export default authSlice.reducer;
