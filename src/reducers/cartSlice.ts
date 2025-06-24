import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddToCart, DeleteItemFromCart, FetchCartItems, UpdateQuantityOfItem } from "../thunks/cartThunks";


export interface CartProduct{
    id: number;
    name: string;
    price : number;
    quantity: number;
    imageSrc: string;
    delivery: string;
    brand: string;
}

// STORE STATE TYPE 
interface CartState{
    items: CartProduct[]; 
    loadingById: Record<number, boolean>;
    error: string | null | undefined;
}

// STORE INITIAL STATE
const initialState: CartState = {
    items: [],
    loadingById: {},
    error: null
}

// HELPER FUNCTIONS
// function HandlePending(state: CartState, action){state.loading = true;}
const HandlePending = (state: CartState, action: AnyAction)=>{
    state.loadingById[action.meta.arg.itemId] = true;
}
function HandleRejected(state: CartState, action: AnyAction){
    state.error = action.payload?? "Something went wrong!";
    state.loadingById[action.meta.arg.itemId] = false;
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder

        // ADD TO CART
        .addCase(AddToCart.pending, (state, action)=>{
            state.loadingById[action.meta.arg.item.id] = true;
        })
        .addCase(AddToCart.fulfilled, (state, action)=>{
            state.items.unshift(action.payload); 
            state.loadingById[action.meta.arg.item.id] = false;
        })
        .addCase(AddToCart.rejected, (state,action)=>{
            state.error = action.payload?? "Something went wrong!";
            state.loadingById[action.meta.arg.item.id] = false;
        })

        // UPDATE QUANTITY
        .addCase(UpdateQuantityOfItem.pending, HandlePending) 
        .addCase(UpdateQuantityOfItem.fulfilled, (state, action)=>{
            const {quantity, itemId} = action.payload;            
            const item = state.items.find((item)=> item.id === itemId)
            if(item){
                item.quantity = quantity;
            }
            state.loadingById[action.meta.arg.itemId] = false;
        })
        .addCase(UpdateQuantityOfItem.rejected, HandleRejected)

        // DELETE ITEM
        .addCase(DeleteItemFromCart.pending, HandlePending)
        .addCase(DeleteItemFromCart.fulfilled, (state, action)=>{
            state.items = state.items.filter((item)=> item.id != action.payload);
            state.loadingById[action.meta.arg.itemId] = false;
        })
        .addCase(DeleteItemFromCart.rejected, HandleRejected)

        // UPDATE CART FROM DB
        .addCase(FetchCartItems.fulfilled, (state, action: PayloadAction<CartProduct[]>)=>{
            state.items = action.payload;
        })
        .addCase(FetchCartItems.rejected, (state, action)=>{state.error = action.payload?? "Something went wrong!"});
    }

})

export default cartSlice.reducer;