import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { signUpUser, signInUser, signOutUser, SerializedUser, checkAuthStatus } from "../thunks/authThunks.ts";

interface AuthType{
    user: {userId: string | null, displayName: string | null};
    loading: boolean;
    error: string | null | undefined;
}

const initialState : AuthType = {
    user: {userId: null, displayName: null},
    loading: true,
    error: null,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(signUpUser.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action: PayloadAction<SerializedUser>)=>{
                state.loading = false;
                state.user.userId = action.payload.uid;
                state.user.displayName = action.payload.username;
            })
            .addCase(signUpUser.rejected, (state, action: PayloadAction<string | undefined>)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signInUser.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(signInUser.fulfilled, (state, action: PayloadAction<SerializedUser>)=>{
                state.loading = false;
                state.user.userId = action.payload.uid;
                state.user.displayName = action.payload.username;
            })
            .addCase(signInUser.rejected, (state, action: PayloadAction<string | undefined>)=>{
                state.loading = false;
                state.error = action.payload;
            })
            // .addCase(signOutUser.pending, (state)=>{
            //     state.loading = true;
            // })
            .addCase(signOutUser.fulfilled, (state)=> {
                state.user.userId = null;
                state.user.displayName = null;
            })
            // .addCase(signOutUser.rejected, (state, action)=>{
            //     state.loading = false;
            //     state.error = action.payload ?? "Unknown error occured!";
            // })
            .addCase(checkAuthStatus.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action: PayloadAction<SerializedUser | null>)=>{
                state.loading = false;
                state.user.userId = action.payload? action.payload.uid : null; 
                state.user.displayName = action.payload? action.payload.username : null; 
            })
    },
})

export default authSlice.reducer;