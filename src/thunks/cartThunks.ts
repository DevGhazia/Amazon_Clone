import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { database } from "../firebase";
import { Product } from "../reducers/productSlice";
import { RootState } from "../store";
import { CartProduct } from "../reducers/cartSlice";

interface AddToCartArg{
    item: Product;
    quantity: number;
} 

function GetUserId(getState: RootState): string{
    const {userId} =  getState.auth.user;
    if(!userId) 
        throw new Error("User not authentication");
    return userId;
}

export const AddToCart = createAsyncThunk<CartProduct, AddToCartArg,  {rejectValue: string, state: RootState}>(
    "cart/addToCart", 
    async ({item, quantity}, {rejectWithValue, getState})=>{
        const itemData: CartProduct = {
            id: item.id, 
            name: item.title, 
            price: item.price, 
            quantity: quantity,
            imageSrc: item.thumbnail,
            delivery: item.shippingInformation,
            brand: item.brand?? "",
        }
        const userId = GetUserId(getState());
        console.log(itemData.brand);
        const itemRef = doc(database, "cart", userId, "items", String(item.id));
        try{
            await setDoc(itemRef, itemData);
            return itemData;
        }
        catch(error: any){
            return rejectWithValue(error.message);
        }
    }
)

export const UpdateQuantityOfItem = createAsyncThunk<
    {quantity: number, itemId: number}, 
    {quantity: number, itemId: number}, 
    {rejectValue: string, state: RootState}>(
    "cart/setQuantity", 
    async ({quantity, itemId}, {rejectWithValue, getState})=>{
        const userId = GetUserId(getState());
        const itemRef = doc(database, "cart", userId, "items", String(itemId));
        try{
            await setDoc(itemRef, {quantity}, {merge: true});
            return {quantity, itemId};
        }
        catch(error: any){
            return rejectWithValue(error.message);
        }
    }
)

export const DeleteItemFromCart = createAsyncThunk
    <number, {itemId: number}, {rejectValue: string, state: RootState}>
    ("cart/deleteItem", async({itemId}, {rejectWithValue, getState})=>{
        const userId = GetUserId(getState()); 
        const docRef = doc(database, "cart", userId, "items", String(itemId));
    try{
        await deleteDoc(docRef);
        return itemId;
    }
    catch(error: any){
        return rejectWithValue(error.message);
    }
})

export const FetchCartItems = createAsyncThunk<CartProduct[], void, {rejectValue: string, state: RootState}>(
    "cartfetchCartItems", 
    async(_, {rejectWithValue, getState})=>{
        const userId = GetUserId(getState());
        const docRef = collection(database, "cart", userId, "items");
        try{
            const snapshot = await getDocs(docRef);
            const items = snapshot.docs.map(doc => doc.data()) as CartProduct[];
            return items;
        }
        catch(error: any){
            return rejectWithValue(error.message);
        }
    }
)