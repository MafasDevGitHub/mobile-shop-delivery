import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
    username: JSON.parse(localStorage.getItem("app-user"))?.username || "Guest",
}

const AuthSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.username = action.payload.username;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem("app-user", JSON.stringify({username: action.payload.username}));
        },

        logOut: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.username = "Guest";

            localStorage.removeItem("token");
            localStorage.removeItem("app-user")
        }
    }

});

export const { loginSuccess, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
