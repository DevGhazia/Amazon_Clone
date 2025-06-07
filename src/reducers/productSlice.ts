import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
    fetchCategoryList, 
    fetchProductDescriptionAndReviews, 
    fetchProductsByCategory, 
    fetchSearchProducts, 
    fetchSingleProduct 
} from "../thunks/productThunks";

export interface Product{
    id: number;
    title: string;
    rating: number;
    catergory: string;
    price: number;
    thumbnail: string;
    description: string;
    bulletPoints: string[];
    images: string[];
    discountPercentage: string;
    weight: string;
    brand: string;
    dimensions: Record<string, number>;
    shippingInformation: string;
    returnPolicy: string;
    warrantyInformation: string;
    availabilityStatus: string;
    category: string;
    stock: string;
}

interface ReviewType{
    user: string;
    rating: number;
    reviewTitle: string;
    date: string;
    comment: string;
}

export interface MiscDetails{
    features: string[];
    reviews : ReviewType[];
}

interface ProductsData{
    items: Product[];
    isFetched: boolean;
    total: number;
}

// STORE STATE
interface ProductsState{
    searchProducts: ProductsData | null;
    categoryProducts: Record<string, ProductsData>;
    singleProduct: Product | null; 
    selectedProduct: number | null;
    categoryList : string[] | null;
    allCategoryDetails: Record<string, MiscDetails> | null;
    loading: boolean;
    error: string | null;
}

// INITIAL VALUE 
const initialState : ProductsState = {
    searchProducts: null,
    categoryProducts: {},
    singleProduct: null,
    allCategoryDetails: null,
    categoryList: null,
    selectedProduct: null,
    loading: false,
    error: null,
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearProduct : (state)=>{
            state.singleProduct = null;
        },
    },
    extraReducers: (builder) =>{
        builder

            // FETCH PRODUCST BY CATEGORY
            .addCase(fetchProductsByCategory.pending, (state)=>{state.loading = true;})
            .addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<{category: string, products: Product[], total: number}>)=>{
                const {category, products, total} = action.payload;
                state.categoryProducts[category] = {
                    items: products,
                    isFetched: true,
                    total: total
                }
                state.loading = false;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action: PayloadAction<string | undefined>)=>{
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch products."; 
            })

            // FETCH PRODUCST BY QUERY
            .addCase(fetchSearchProducts.pending, (state)=>{state.loading = true;})
            .addCase(fetchSearchProducts.fulfilled, (state, action: PayloadAction<{items: Product[], total: number}>)=>{
                state.searchProducts = {
                    items: action.payload.items,
                    isFetched: true,
                    total: action.payload.total
                }
                state.loading = false;
            })
            .addCase(fetchSearchProducts.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload?? "unknow error occured!";
            })

            // FETCH SINGLE PRODUCT
            .addCase(fetchSingleProduct.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<Product>)=>{
                state.selectedProduct = action.payload.id;
                state.singleProduct = action.payload;
                state.loading = false;
            })
            .addCase(fetchSingleProduct.rejected, (state, action: PayloadAction<string | undefined>)=>{
                state.loading = false;
                state.error = action.payload ?? "Uknown error occured!";
            })

            // FETCH PRODUCTS REVIEWS
            .addCase(fetchProductDescriptionAndReviews.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchProductDescriptionAndReviews.fulfilled, (state, action: PayloadAction<Record<string, MiscDetails>>)=>{
                state.allCategoryDetails = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductDescriptionAndReviews.rejected, (state, action: PayloadAction<string | undefined>)=>{
                state.loading = false;
                state.error = action.payload ?? "Unknown error occured!"; 
            })

            // FETCH CATEGORY LIST
            .addCase(fetchCategoryList.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchCategoryList.fulfilled, (state, action: PayloadAction<string[]>)=>{
                state.categoryList = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategoryList.rejected, (state, action: PayloadAction<string | undefined >)=>{
                state.loading = false;
                state.error = action.payload ?? "Unknow error occured!";
            })
    }
});

export const {clearProduct} = productSlice.actions; 
export default productSlice.reducer;
