import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType< typeof store.getState>
export type AppDispatch = typeof store.dispatch