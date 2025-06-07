import { createAsyncThunk } from "@reduxjs/toolkit";
import { MiscDetails, Product } from "../reducers/productSlice";

const PRODUCT_BASE_URL: string = "https://dummyjson.com/products";
type FetchParams = {
    category?: string;
    limit?: number;
    skip?: number;
    page?: string;
    sort?: string;
    order?: string;
    query?: string;
};

function GetQueryParams(args: FetchParams): URLSearchParams {
    const { limit, skip, sort, order, query, page, category} = args; 
    const queryParams = new URLSearchParams();
    if(category) queryParams.append('category', category);
    if(query) queryParams.append('q', query); 
    if(page) queryParams.append('page', page)   
    if(limit) queryParams.append('limit', String(limit));
    if(skip) queryParams.append('skip', String(skip));
    if(sort) queryParams.append('sortBy', sort); 
    if(order) queryParams.append('order', order); 
    return queryParams;
}

export const fetchProductsByCategory = createAsyncThunk<{category: string, products: Product[], total: number}, FetchParams, {rejectValue : string}>(
    "products/fetchByCategory",
    async(args, {rejectWithValue})=>{
        const {category} = args;
        if(!category)return rejectWithValue("category is required");
        try{
            const response = await fetch(`${PRODUCT_BASE_URL}/category/${category}?${GetQueryParams(args).toString()}`);
            if(!response.ok)
                return rejectWithValue(`HTTP error!, status : ${response.status}`);
            const data = await response.json();
            return {category, products: data.products, total: data.total};
        }
        catch(error){
            if(error instanceof Error)
                return rejectWithValue(error.message);
            return rejectWithValue("An unknown error occured!");
        }
    }
)

export const fetchSearchProducts = createAsyncThunk<{items: Product[], total: number}, FetchParams, {rejectValue : string}>(
    "products/fetchByQuery",
    async(args, {rejectWithValue})=>{
        try{
            const response = await fetch(`${PRODUCT_BASE_URL}/search?${GetQueryParams(args).toString()}`)
            if(!response.ok)
                return rejectWithValue(`HTTP error!, status : ${response.status}`);
            const data = await response.json();
            return {items: data.products, total: data.total};
        }
        catch(error : any){
            return rejectWithValue(error.message);
        }
    }
)

export const fetchSingleProduct = createAsyncThunk<Product, string , {rejectValue: string}>(
    "prodcuts/fetchSingleProduct", 
    async (itemId, {rejectWithValue })=>{
        try{
            const response = await fetch(`${PRODUCT_BASE_URL}/${itemId}`);
            if(!response.ok)
                return rejectWithValue(`HTTP error!, status : ${response.status}`);
            const data = await response.json();
            return data;
        }
        catch(error: any){
            return rejectWithValue(error.message);
        }
    }
)

export const fetchProductDescriptionAndReviews = createAsyncThunk<Record<string, MiscDetails>, void, {rejectValue: string}>(
    "product/fetchDescriptionAndReviews",
    async (_, {rejectWithValue})=>{
        try{
            const response = await fetch("https://dummyjson.com/c/870d-e6d1-4d87-8968");
            if(!response.ok)
                return rejectWithValue(`HTTP error!, status : ${response.status}`);
            const data = await response.json();            
            return data;
        }
        catch(error: any){
            return rejectWithValue(error.message);
        }
    }
)

export const fetchCategoryList = createAsyncThunk<string[], void, {rejectValue: string}>(
    "products/fetchCategoryList",
    async (_, {rejectWithValue} )=>{
        try{
            const response = await fetch(`https://dummyjson.com/products/category-list`)
            if(!response.ok)
                return rejectWithValue(`HTTP error!, status : ${response.status}`);
            const data = await response.json();
            return data;
        }
        catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);
