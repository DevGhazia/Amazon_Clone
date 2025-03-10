import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthType = {
    isLoggedIn : boolean,
    token : string | null
}

const initialState : AuthType = {
    isLoggedIn : false,
    token : null,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>)=>{
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        logout: (state)=>{
            state.isLoggedIn = false,
            state.token = null
        },
    },
})

export default authSlice.reducer
export const {login, logout} = authSlice.actions