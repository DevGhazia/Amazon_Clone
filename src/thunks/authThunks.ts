import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { User, auth } from "../firebase.ts";

export interface SerializedUser{
    uid: string;
    email: string | null;
    username: string | null;
}

interface SignUpCredType{
    email: string;
    password: string;
    username: string;
}

interface SignInCredType{
    email: string;
    password: string;
}

export const checkAuthStatus = createAsyncThunk(
    "auth/checkAuthStatus", 
    ()=>{
        return new Promise<SerializedUser | null>((resolve)=>{
            return onAuthStateChanged(auth, (user)=>{
                resolve(user? {
                    uid: user.uid,
                    email: user.email, 
                    username: user.displayName
                }: null);
        })
    })
})

export const signUpUser = createAsyncThunk<SerializedUser, SignUpCredType, {rejectValue : string}>(
    "auth/signUp", 
    async ({email, password, username}, {rejectWithValue})=>{
        try{
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            const user: User = userCred.user;
            await updateProfile(user, {displayName: username});
            return {
                uid: user.uid,
                email: user.email,
                username: user.displayName
            }
        }
        catch(error: any){
            let errorMessage: string; 
            switch(error.code){
                case "auth/email-already-in-use":  
                    errorMessage =  "This email is already registered. Please log in.";
                    break;
                case "auth/invalid-email": 
                    errorMessage = "Please enter a valid email address."
                    break;
                case "auth/network-request-failed":
                    errorMessage = "Network request failed. Please check your internet connection."
                    break;
                default: 
                    errorMessage = error.message;
            }
            return rejectWithValue(errorMessage);
        }
    }
)

export const signInUser = createAsyncThunk<SerializedUser, SignInCredType, {rejectValue: string}>(
    "auth/signIn", 
    async ({email, password}, {rejectWithValue})=>{
        try{
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            const user: User = userCred.user;
            return {
                uid: user.uid,
                email: user.email,
                username: user.displayName
            }
        }
        catch(error: any){
            let errorMessage: string;
            switch(error.code){
                case "auth/invalid-credential": 
                    errorMessage = "Authentication failed. Please verify your login details."
                    break;
                case "auth/invalid-email": 
                    errorMessage = "Please enter a valid email address."
                    break;
                default: 
                    errorMessage = error.message;
            }
            return rejectWithValue(errorMessage);
        }
    }
)

export const signOutUser = createAsyncThunk<null, void, {rejectValue: string}>(
    "auth/signOut", 
    async (_, {rejectWithValue})=>{
        try{
            await signOut(auth);
            return null;
        }
        catch(error: unknown){
            if(error instanceof Error)
                return rejectWithValue(error.message);
            else
                return rejectWithValue("An unknown erorr occured!");
        }
    }
)