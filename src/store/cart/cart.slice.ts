import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../components/product-card/product-card.component";
import Cookies from 'universal-cookie';

export interface CartItem extends Product {
    quantity: number
}

export interface CartState {
    cartVisibility: boolean
    error: string | undefined
    isLoading: boolean
    cartItems: CartItem[]
}

const CartInitialState: CartState = {
    cartVisibility: false,
    error: undefined,
    isLoading: false,
    cartItems: []
}

const cookies = new Cookies();

export const fetchCartItemsAsync = createAsyncThunk(
    "cart/fetchCartItemsAsync",
    async()=>{
        const TOKEN = cookies.get("cc_jwt_token");
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user/cart`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });
        switch(response.status){
                case 200:
                    const cart = await response.json();
                    return cart;
                case 401:
                    throw new Error("Session expired. Please login again to continue.");
        }
    }
)

export const addToCartAsync = createAsyncThunk(
    "cart/addItemToCart",
    async (productToAdd: Product) =>{
        const TOKEN = cookies.get("cc_jwt_token");
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user/cart/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(productToAdd)
        });
        switch(response.status){
            case 201:
                const updatedCart = await response.json();
                return updatedCart;
            case 401:
                throw new Error("Session expired. Please login again to continue.");
        }
    }
)

export const removeFromCartAsync = createAsyncThunk(
    "cart/removeItemFromCart",
    async (productToRemove: Product) =>{
        const TOKEN = cookies.get("cc_jwt_token");
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user/cart/remove`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(productToRemove)
        });
        switch(response.status){
            case 200:
                const updatedCart = await response.json();
                return updatedCart;
            case 401:
                throw new Error("Session expired. Please login again to continue.");
        }
    }
);

export const clearFromCartAsync = createAsyncThunk(
    "cart/clearItemFromCart",
    async(productToClear: Product)=>{
        const TOKEN = cookies.get("cc_jwt_token");
        const response = await fetch(`${process.env.REACT_APP_SERVER}/user/cart/clear`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${TOKEN}`
            },
            body: JSON.stringify(productToClear)
        });
        switch(response.status){
            case 200:
                const updatedCart = await response.json();
                return updatedCart;
            case 401:
                throw new Error("Session expired. Please login again to continue.");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: CartInitialState,
    reducers: {
        setCartItemsEmpty: (state)=>{
            state.cartItems = []
        },
        setCartVisibility: (state, action: PayloadAction<boolean>) => {
            state.cartVisibility = action.payload
        },
        resetCartError:(state)=>{
            state.error = undefined;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchCartItemsAsync.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchCartItemsAsync.fulfilled, (state, action: PayloadAction<CartItem[]>)=>{
            state.isLoading = false
            state.cartItems = action.payload
        })
        .addCase(fetchCartItemsAsync.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(addToCartAsync.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(addToCartAsync.fulfilled, (state, action: PayloadAction<CartItem[]>)=>{
            state.isLoading = false
            state.cartItems = action.payload
        })
        .addCase(addToCartAsync.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(removeFromCartAsync.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(removeFromCartAsync.fulfilled, (state, action: PayloadAction<CartItem[]>)=>{
            state.isLoading = false
            state.cartItems = action.payload
        })
        .addCase(removeFromCartAsync.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(clearFromCartAsync.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(clearFromCartAsync.fulfilled, (state, action: PayloadAction<CartItem[]>)=>{
            state.isLoading = false
            state.cartItems = action.payload
        })
        .addCase(clearFromCartAsync.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});

const cartReducer = cartSlice.reducer;

export const { setCartItemsEmpty, setCartVisibility, resetCartError } = cartSlice.actions;

export default cartReducer;
